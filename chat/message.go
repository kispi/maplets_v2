package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"time"
)

// Message -
type Message struct {
	Content          *Content   `json:"content,omitempty"`
	User             *User      `json:"user,omitempty"`
	Timestamp        *time.Time `json:"timestamp,omitempty"`
	EventType        string     `json:"eventType,omitempty"`
	Status           string     `json:"status,omitempty"`
	ConnectedClients []*User    `json:"connectedClients,omitempty"`
	To               []*User    `json:"to,omitempty"` // If nil, it's broadcasted to entire clients by default.
}

// Content -
type Content struct {
	Text string `json:"text,omitempty"`
	Type string `json:"type,omitempty"`
}

// User -
type User struct {
	AuthToken        string `json:"authToken,omitempty"`
	LastChatWith     string `json:"lastChatWith,omitempty"`
	Nickname         string `json:"nickname,omitempty"`
	SelectedChatType string `json:"selectedChatType,omitempty"`
	World            string `json:"world,omitempty"`
	IP               string `json:"ip,omitempty"`
}

const (
	ContentTypeItem      = "ITEM"
	ContentTypeNormal    = "NORMAL"
	ContentTypeMegaphone = "MEGAPHONE"
	ContentTypeWhisper   = "WHISPER"
	ContentTypeHyper     = "HYPER"

	StatusSuccess = "SUCCESS"
	StatusError   = "ERROR"

	EventTypeBroadcastChange = "BROADCAST_CHANGE"
	EventTypeSetUser         = "SET_USER"
	EventTypeGetUsers        = "GET_USERS"

	EventTypeChat  = "CHAT"
	EventTypeEnter = "ENTER"
	EventTypeLeave = "LEAVE"
)

func (m *Message) isBroadcastableContentType() bool {
	if m.Content == nil {
		return false
	}
	return m.Content.Type == ContentTypeItem ||
		m.Content.Type == ContentTypeNormal ||
		m.Content.Type == ContentTypeMegaphone ||
		m.Content.Type == ContentTypeWhisper ||
		m.Content.Type == ContentTypeHyper
}

func now() *time.Time {
	t := time.Now()
	seoulLocale, err := time.LoadLocation("Asia/Seoul")
	if err != nil || seoulLocale == nil {
		return &t
	}
	t = t.In(seoulLocale)
	return &t
}

// ToByte -
func (m *Message) ToByte() []byte {
	b, err := json.Marshal(m)
	if err != nil {
		log.Print(err)
		return nil
	}
	return b
}

// HandleMessage -
func HandleMessage(c *Conn, message []byte, r *http.Request) {
	log.Print("message from client:", string(message))
	m := &Message{}
	err := json.Unmarshal(message, m)
	onerror(err)

	switch m.EventType {
	case EventTypeSetUser:
		onSetUser(c, m, r)
	case EventTypeGetUsers:
		onGetUser(c, m)
	case EventTypeBroadcastChange:
		onBroadcastChange(c, m)
	case EventTypeChat:
		onChat(c, m)
	}
}

func onerror(err error) {
	if err != nil {
		log.Print(err)
	}
}

func onSetUser(c *Conn, m *Message, r *http.Request) {
	if m.User == nil {
		return
	}

	if m.User.AuthToken == "" {
		newUser := c.hub.newUser(r)
		m.User = newUser
		c.user = newUser
		c.hub.addOrUpdateAccount(c.user)
		c.Notify(m, StatusSuccess)
		return
	}

	authUser, err := c.hub.getAuthUser(m)
	if err != nil {
		m.Status = err.Error()
		c.Notify(m, m.Status)
		return
	}

	existing, err := c.hub.findAccount(m.User)
	if existing != nil {
		if existing.AuthToken != authUser.AuthToken {
			m.Status = "NICKNAME_ARLEADY_EXIST"
			c.Notify(m, m.Status)
			return
		}
	}

	authUser = m.User
	c.user = authUser
	c.hub.addOrUpdateAccount(c.user)
	c.Notify(m, StatusSuccess)
}

func onBroadcastChange(c *Conn, m *Message) {
	c.hub.Broadcast(&Message{
		EventType: EventTypeBroadcastChange,
		User:      c.user,
	}, StatusSuccess)
}

func onGetUser(c *Conn, m *Message) {
	c.Notify(&Message{
		User:             m.User,
		EventType:        EventTypeGetUsers,
		Status:           StatusSuccess,
		Timestamp:        now(),
		ConnectedClients: c.hub.getConnectedUsers("account"),
	}, StatusSuccess)
}

func onChat(c *Conn, m *Message) {
	errMsg := &Message{
		EventType: EventTypeChat,
		Timestamp: now(),
	}

	if m.Content == nil {
		c.Notify(errMsg, "CONTENT_NOT_EXIST")
		return
	}

	_, err := c.hub.getAuthUser(m)
	if err != nil {
		m.Status = err.Error()
		c.Notify(m, m.Status)
		return
	}

	if c.user.World == "" || c.user.Nickname == "" {
		c.Notify(errMsg, "INVALID_USER_INFO")
		return
	}

	if !m.isBroadcastableContentType() {
		c.Notify(errMsg, "INVALID_CONTENT_TYPE")
		return
	}

	if m.Content.Type == ContentTypeWhisper {
		onWhisper(c, m)
		return
	}

	m.User = c.user
	m.Timestamp = now()
	c.hub.Broadcast(m, StatusSuccess)
	return
}

func onWhisper(c *Conn, m *Message) {
	if m.To == nil || len(m.To) == 0 {
		c.Notify(m, "INVALID_WHISPER_PAYLOAD")
		return
	}
	partner, err := c.hub.findAccount(m.To[0])
	if err != nil {
		c.Notify(m, "USER_NOT_FOUND:"+m.To[0].Nickname)
		return
	}
	m.To = []*User{partner, c.user}
	c.hub.Broadcast(m, StatusSuccess)
}

// Post -
func (m *Message) Post() (err error) {
	type toMarshal struct {
		User      *User      `json:"user"`
		Content   *Content   `json:"content"`
		Timestamp *time.Time `json:"timestamp"`
		EventType string     `json:"eventType"`
		Status    string     `json:"status"`
	}

	tm := &toMarshal{
		User:      m.User,
		Content:   m.Content,
		Timestamp: m.Timestamp,
		EventType: m.EventType,
		Status:    m.Status,
	}

	type payload struct {
		Content string `json:"content"`
	}

	b, _ := json.Marshal(tm)
	p := &payload{Content: string(b)}

	b, _ = json.Marshal(p)
	buff := bytes.NewBuffer(b)
	_, err = http.Post("http://127.0.0.1:4500/v1/messages", "application/json", buff)
	return
}
