
interface Notification {
    id: string
    type: "venta" | "inventario" | "cliente" | "alerta" | "exito"
    title: string
    message: string
    time: string
    read: boolean
}

const notifications: Notification[] = [
    {
        id: "1",
        type: "venta",
        title: "Nueva venta registrada",
        message: "Pedido #1234 por $2,500.00 completado",
        time: "Hace 5 min",
        read: false
    },
    {
        id: "2",
        type: "inventario",
        title: "Stock bajo",
        message: "El producto 'Laptop HP' tiene solo 3 unidades",
        time: "Hace 15 min",
        read: false
    },
    {
        id: "3",
        type: "cliente",
        title: "Nuevo cliente registrado",
        message: "Maria Garcia se ha registrado en el sistema",
        time: "Hace 1 hora",
        read: false
    },
    {
        id: "4",
        type: "alerta",
        title: "Pago pendiente",
        message: "La factura #567 tiene 5 dias de vencida",
        time: "Hace 2 horas",
        read: true
    },
    {
        id: "5",
        type: "exito",
        title: "Backup completado",
        message: "El respaldo de datos se realizo correctamente",
        time: "Hace 3 horas",
        read: true
    }
]

const typeConfig = {
    venta: { icon: "bi-cart-check", bg: "bg-success", color: "text-success" },
    inventario: { icon: "bi-box-seam", bg: "bg-warning", color: "text-warning" },
    cliente: { icon: "bi-person-plus", bg: "bg-info", color: "text-info" },
    alerta: { icon: "bi-exclamation-triangle", bg: "bg-danger", color: "text-danger" },
    exito: { icon: "bi-check-circle", bg: "bg-success", color: "text-success" }
}

interface NotificationsPanelProps {
    isOpen: boolean
    onClose: () => void
}

const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <>
            {/* Backdrop */}
            <div
                className={`position-fixed top-0 start-0 w-100 h-100 ${isOpen ? 'd-block' : 'd-none'}`}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1060,
                    transition: 'opacity 0.3s ease'
                }}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className="position-fixed top-0 end-0 h-100 bg-body shadow-lg d-flex flex-column"
                style={{
                    width: '380px',
                    maxWidth: '100vw',
                    zIndex: 1061,
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease'
                }}
            >
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
                    <div className="d-flex align-items-center gap-2">
                        <h5 className="mb-0 fw-semibold">Notificaciones</h5>
                        {unreadCount > 0 && (
                            <span className="badge bg-primary rounded-pill">{unreadCount}</span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '36px', height: '36px' }}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* Actions */}
                <div className="d-flex align-items-center justify-content-between px-4 py-2 bg-body-secondary border-bottom">
                    <button className="btn btn-sm btn-link text-decoration-none p-0">
                        <i className="bi bi-check-all me-1"></i>
                        Marcar todas como leidas
                    </button>
                    <button className="btn btn-sm btn-link text-decoration-none text-danger p-0">
                        <i className="bi bi-trash me-1"></i>
                        Limpiar
                    </button>
                </div>

                {/* Notifications List */}
                <div className="flex-grow-1 overflow-auto">
                    {notifications.map((notification) => {
                        const config = typeConfig[notification.type]
                        return (
                            <div
                                key={notification.id}
                                className={`d-flex gap-3 px-4 py-3 border-bottom ${!notification.read ? 'bg-body-secondary' : ''}`}
                                style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bs-secondary-bg)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notification.read ? '' : 'var(--bs-secondary-bg)'}
                            >
                                {/* Icon */}
                                <div
                                    className={`rounded-circle ${config.bg} bg-opacity-25 d-flex align-items-center justify-content-center flex-shrink-0`}
                                    style={{ width: '44px', height: '44px' }}
                                >
                                    <i className={`bi ${config.icon} ${config.color} fs-5`}></i>
                                </div>

                                {/* Content */}
                                <div className="flex-grow-1 overflow-hidden">
                                    <div className="d-flex align-items-start justify-content-between gap-2">
                                        <h6 className="mb-1 fw-semibold text-truncate" style={{ fontSize: '14px' }}>
                                            {notification.title}
                                        </h6>
                                        {!notification.read && (
                                            <span
                                                className="bg-primary rounded-circle flex-shrink-0"
                                                style={{ width: '8px', height: '8px', marginTop: '6px' }}
                                            ></span>
                                        )}
                                    </div>
                                    <p className="mb-1 text-secondary small text-truncate">{notification.message}</p>
                                    <span className="text-muted" style={{ fontSize: '12px' }}>{notification.time}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-top">
                    <a
                        href="/notificaciones"
                        className="btn btn-primary w-100"
                    >
                        Ver todas las notificaciones
                    </a>
                </div>
            </div>
        </>
    )
}

export default NotificationsPanel;
