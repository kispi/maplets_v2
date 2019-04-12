package main

import (
	"errors"
	"fmt"
	"log"
)

type Hub struct {
	connections map[*Conn]bool
	broadcast   chan *Message
	register    chan *Conn
	unregister  chan *Conn

	accounts []*User // This could be from database later on.
}

func newHub() *Hub {
	return &Hub{
		broadcast:   make(chan *Message),
		register:    make(chan *Conn),
		unregister:  make(chan *Conn),
		connections: make(map[*Conn]bool),
	}
}

func (h *Hub) run() {
	log.Print("Maplets chat server is running on port:4600")
	for {
		select {
		case Conn := <-h.register:
			h.connections[Conn] = true
			log.Printf("Num Connected WS: %d", len(h.connections))
		case Conn := <-h.unregister:
			if _, ok := h.connections[Conn]; ok {
				// If we delete account, user cannot do 'reconnect' with the same authToken.
				h.deleteAccount(Conn.user) // If we use database, we don't need this
				delete(h.connections, Conn)
				close(Conn.send)
				log.Printf("Num Connected WS: %d", len(h.connections))
			}
		case message := <-h.broadcast:
			h.BroadcastMessage(message)
		}
		h.printAccounts()
		h.printConnections()
	}
}

func (h *Hub) BroadcastMessage(message *Message) bool {
	sent := false
	targetconnections := h.connections
	if message.To != nil && len(message.To) > 0 {
		targetconnections = h.filteredTargets(message.To)
	}

	for Conn := range targetconnections {
		select {
		case Conn.send <- message.ToByte():
			log.Print("Message sent:", string(message.ToByte()))
		default:
			close(Conn.send)
			delete(h.connections, Conn)
		}
	}
	return sent
}

func (h *Hub) filteredTargets(to []*User) map[*Conn]bool {
	targets := make(map[*Conn]bool)
	for _, incomingUser := range to {
		for conn := range h.connections {
			if conn.user.Nickname == incomingUser.Nickname ||
				conn.user.AuthToken == incomingUser.AuthToken {
				targets[conn] = true
			}
		}
	}
	return targets
}

func (h *Hub) getConnectedUsers(userType string) (users []*User) {
	if userType == "account" {
		for _, acc := range h.accounts {
			users = append(users, acc)
		}
	} else if userType == "connection" {
		for conn := range h.connections {
			users = append(users, conn.user)
		}
	}
	return
}

// Broadcast -
func (h *Hub) Broadcast(message *Message, status string) {
	message.Status = status
	h.broadcast <- message
}

func (h *Hub) newUser() *User {
	return &User{
		AuthToken: h.generateToken(),
		Nickname:  "익명" + h.generateToken(),
		World:     "NONE",
	}
}

func (h *Hub) generateToken() (token string) {
	for i := 0; i < 100; i++ {
		found := false
		for conn := range h.connections {
			token = RandomString(8)
			found = conn.user.AuthToken == token
		}
		if !found {
			log.Printf("Generated Token: %s", token)
			return
		}
	}
	log.Print("Failed to generate token within 100 trials")
	return
}

func (h *Hub) getAuthUser(m *Message) (*User, error) {
	if m.User == nil {
		return nil, errors.New("NIL_USER")
	}

	for _, user := range h.accounts {
		if user.AuthToken == m.User.AuthToken {
			return user, nil
		}
	}
	return nil, errors.New("INVALID_AUTH_TOKEN")
}

func (h *Hub) findAccount(incomingUser *User) (*User, error) {
	for _, user := range h.accounts {
		if incomingUser.Nickname != "" {
			if user.Nickname == incomingUser.Nickname {
				return user, nil
			}
		} else {
			if user.AuthToken == incomingUser.AuthToken {
				return user, nil
			}
		}
	}
	return nil, errors.New("NON_EXIST_USER")
}

func (h *Hub) printAccounts() {
	result := "\n--------\nACCOUNTS:\n"
	for _, a := range h.accounts {
		result += fmt.Sprintf("AuthToken: %s, Nickname: %s, World: %s\n", a.AuthToken, a.Nickname, a.World)
	}
	result += "--------\n"
	log.Print(result)
}

func (h *Hub) printConnections() {
	result := "\n--------\nCONNECTIONS:\n"
	for conn := range h.connections {
		result += fmt.Sprintf("AuthToken: %s, Nickname: %s, World: %s\n", conn.user.AuthToken, conn.user.Nickname, conn.user.World)
	}
	result += "--------\n"
	log.Print(result)
}

func (h *Hub) addOrUpdateAccount(user *User) {
	for i, u := range h.accounts {
		if u.AuthToken == user.AuthToken {
			h.accounts[i] = user
			return
		}
	}
	h.accounts = append(h.accounts, user)
}

func (h *Hub) deleteAccount(user *User) {
	for i, u := range h.accounts {
		if u.AuthToken == user.AuthToken {
			h.accounts = append(h.accounts[:i], h.accounts[i+1:]...)
			break
		}
	}
}
