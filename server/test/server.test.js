const chai = require("chai");
const io = require("socket.io-client");

const { server } = require("../");

const expect = chai.expect;
const PORT = process.env.PORT || 3000;
const socketURL = `http://localhost:${PORT}`;

let client1, client2, _server;
const room = "testRoom";
const message = "Hello, room!";
const drawing = {
    color: "#000000",
    lineWidth: 1,
    prevPos: { x: 0, y: 0 },
    currPos: { x: 1, y: 1 },
};

describe("Socket.IO Server Tests", () => {
    before((done) => {
        _server = server.listen(PORT, () => {
            client1 = io.connect(socketURL);
            client2 = io.connect(socketURL);
            client1.on("connect", () => {
                expect(client1.connected).to.be.true;
            });
            client2.on("connect", () => {
                expect(client2.connected).to.be.true;
            });
            done();
        });
    });

    after((done) => {
        if (client1.connected) {
            client1.disconnect();
        }

        if (client2.connected) {
            client2.disconnect();
        }

        _server.close();

        done();
    });

    it("should join a room", (done) => {
        client1.emit("joinRoom", room);
        client2.emit("joinRoom", room);
        done();
    });

    it("should broadcast a message to other clients in the room", (done) => {
        client1.emit("message", { room, message });
        client2.on("message", (receivedMessage) => {
            expect(receivedMessage).to.equal(message);
            done();
        });
    });

    it("should broadcast a drawing to other clients in the room", (done) => {
        client1.emit("drawing-update", { room, drawing });
        client2.on("drawing-update", (receivedDrawing) => {
            expect(receivedDrawing).to.deep.equal(drawing);
            done();
        });
    });
});
