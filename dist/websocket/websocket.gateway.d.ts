import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    private activeBuses;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private handleStartTracking;
    private handleStopTracking;
    private handleUpdateLocation;
    private handleGetActiveBuses;
    private startAutomaticTracking;
    private stopAutomaticTracking;
    private stopAutomaticTrackingBySocketId;
}
