function startWaiterConnection() {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://tapngo-api-hmhtczg8dyfraxf7.germanywestcentral-01.azurewebsites.net/waiterHub")
        .withAutomaticReconnect()
        .build();

    connection.on("CalledWaiter", function (tableId, note) {
        const $notification = $(`
            <div class="notification">
                Konobar je pozvan za stol ${tableId} - ${note}
            </div>
        `);

        $("#notification-container").append($notification);

        $notification.fadeIn();

        setTimeout(function () {
            $notification.fadeOut(function () {
                $(this).remove();
            });
        }, 500000);

        $notification.on("click", function () {
            $(this).fadeOut(function () {
                $(this).remove();
            });
        });
    });

    connection.start()
        .catch(err => console.error("Greška pri pokretanju konekcije:", err));

    return connection;
}

const waiterConnection = startWaiterConnection();
