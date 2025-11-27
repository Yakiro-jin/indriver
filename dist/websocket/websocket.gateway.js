"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let WebsocketGateway = class WebsocketGateway {
    server;
    logger = new common_1.Logger('BusGateway');
    activeBuses = new Map();
    afterInit(server) {
        this.logger.log("Servidor de buses inicializado");
        this.logger.log("Socket escuchando en puerto 3000");
        this.logger.log("Modo: Solo conductores emiten, pasajeros escuchan");
    }
    handleConnection(client) {
        this.logger.log('Cliente conectado:', client.id);
        client.emit('connection_established', {
            message: 'Conectado al servidor de buses',
            clientId: client.id,
            role: 'pending'
        });
        client.on('driver_actions', (data) => {
            this.logger.log('Acción de conductor recibida:', data);
            if (data && data.action) {
                this.logger.log('Procesando acción:', data.action);
                switch (data.action) {
                    case 'start_tracking':
                        this.handleStartTracking(client, data.payload);
                        break;
                    case 'stop_tracking':
                        this.handleStopTracking(client, data.payload);
                        break;
                    case 'update_location':
                        this.handleUpdateLocation(client, data.payload);
                        break;
                    case 'get_active_buses':
                        this.handleGetActiveBuses(client, data.payload);
                        break;
                    default:
                        this.logger.warn('Acción no reconocida:', data.action);
                }
            }
        });
    }
    handleDisconnect(client) {
        this.logger.log('Cliente desconectado: ', client.id);
        this.stopAutomaticTrackingBySocketId(client.id);
    }
    handleStartTracking(client, data) {
        this.logger.log('Conductor iniciando tracking:', data);
        if (!data || !data.busId || !data.initialLat || !data.initialLng) {
            this.logger.error(' Datos incompletos para iniciar tracking');
            client.emit('driver_error', {
                message: 'Datos incompletos. Se requiere busId, initialLat, initialLng'
            });
            return;
        }
        this.logger.log('Iniciando tracking para bus:', data.busId);
        this.startAutomaticTracking(client, data.busId, data.initialLat, data.initialLng, data.route || 'Ruta General', data.driverInfo);
    }
    handleStopTracking(client, data) {
        this.logger.log('Conductor deteniendo tracking:', data);
        if (!data || !data.busId) {
            client.emit('driver_error', { message: 'Se requiere busId' });
            return;
        }
        this.stopAutomaticTracking(data.busId);
        client.emit('tracking_stopped', {
            success: true,
            busId: data.busId,
            message: 'Tracking detenido'
        });
    }
    handleUpdateLocation(client, data) {
        this.logger.log('Actualización manual de ubicación:', data);
        if (!data || !data.busId || !data.lat || !data.lng) {
            client.emit('driver_error', { message: 'Datos incompletos para ubicación' });
            return;
        }
        const bus = this.activeBuses.get(data.busId);
        if (bus) {
            bus.lastLocation = {
                lat: data.lat,
                lng: data.lng,
                route: data.route || bus.lastLocation.route
            };
        }
        this.server.emit('bus_location_update', {
            busId: data.busId,
            lat: data.lat,
            lng: data.lng,
            route: data.route,
            timestamp: Date.now(),
            type: 'manual_update'
        });
        client.emit('location_updated', {
            success: true,
            message: 'Ubicación actualizada manualmente'
        });
    }
    handleGetActiveBuses(client, data) {
        this.logger.log('Conductor solicitando buses activos');
        const buses = Array.from(this.activeBuses.entries()).map(([busId, busData]) => ({
            busId,
            route: busData.lastLocation.route,
            lastLocation: busData.lastLocation,
            lastUpdate: Date.now()
        }));
        client.emit('active_buses_list', {
            buses,
            total: buses.length,
            timestamp: new Date().toISOString()
        });
    }
    startAutomaticTracking(client, busId, initialLat, initialLng, route, driverInfo) {
        if (this.activeBuses.has(busId)) {
            this.stopAutomaticTracking(busId);
        }
        this.logger.log('Iniciando tracking automático para:', 'busId');
        let currentLat = initialLat;
        let currentLng = initialLng;
        const interval = setInterval(() => {
            currentLat += (Math.random() - 0.5) * 0.001;
            currentLng += (Math.random() - 0.5) * 0.001;
            this.logger.log('Bus:', busId, 'en:', currentLat.toFixed(6), currentLng.toFixed(6));
            this.server.emit('bus_location_update', {
                busId: busId,
                lat: currentLat,
                lng: currentLng,
                route: route,
                timestamp: Date.now(),
                speed: Math.random() * 60 + 20,
                type: 'automatic_update'
            });
            const bus = this.activeBuses.get(busId);
            if (bus) {
                bus.lastLocation = { lat: currentLat, lng: currentLng, route };
            }
        }, 20000);
        this.activeBuses.set(busId, {
            socket: client,
            interval: interval,
            lastLocation: { lat: initialLat, lng: initialLng, route },
            driverInfo: driverInfo
        });
        this.server.emit('new_bus_available', {
            busId: busId,
            route: route,
            initialLocation: { lat: initialLat, lng: initialLng },
            timestamp: new Date().toISOString()
        });
        client.emit('tracking_started', {
            success: true,
            busId: busId,
            message: 'Tracking automático iniciado - Actualizaciones cada 20s',
            timestamp: new Date().toISOString()
        });
        this.logger.log('Tracking activo para :', busId);
    }
    stopAutomaticTracking(busId) {
        const bus = this.activeBuses.get(busId);
        if (bus) {
            clearInterval(bus.interval);
            this.activeBuses.delete(busId);
            this.logger.log('Tracking detenido para: ', busId);
            this.server.emit('bus_disconnected', {
                busId,
                timestamp: new Date().toISOString()
            });
        }
    }
    stopAutomaticTrackingBySocketId(socketId) {
        for (const [busId, bus] of this.activeBuses.entries()) {
            if (bus.socket.id === socketId) {
                this.stopAutomaticTracking(busId);
                break;
            }
        }
    }
};
exports.WebsocketGateway = WebsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
exports.WebsocketGateway = WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ['websocket', 'polling']
    })
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map