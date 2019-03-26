package main

import (
	"flag"
	"log"
	"net/http"
)

var addr = flag.String("addr", ":4600", "http service address")

func main() {
	flag.Parse()
	hub := newHub()
	go hub.run()
	http.HandleFunc("/v1/webchat/socket", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

// serveWs handles websocket requests from the peer.
func serveWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	checkOrigin := func(r *http.Request) bool {
		return true
	}
	upgrader.CheckOrigin = checkOrigin
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	conn := &Conn{hub: hub, ws: ws, send: make(chan []byte, 256), user: &User{}}
	conn.hub.register <- conn
	hub.Broadcast(&Message{
		EventType: EventTypeEnter,
		User:      conn.user,
	}, StatusSuccess)

	go conn.writePump()
	go conn.readPump()
}
