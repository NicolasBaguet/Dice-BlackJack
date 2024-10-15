export const message = {
    /**
 * Fonction pour afficher (créer) un message
 *
 * @param {String} text Le texte à afficher
    * @param {String} type Impacte la couleur du message (info, success, warning, error)
    * @param {Number} duration La durée de vie du message
 */
    show: function (text, type = "info", duration = 5000) {
        const $message = document.createElement("div");
        $message.classList.add("message", "message--" + type)
        $message.textContent = text;

        document.getElementById("message-zone").append($message);

        $message.addEventListener("click", () => message.hide($message));
        setTimeout(
            () => message.hide($message),
            duration
        );
    },

    /**
     * Fonction pour cacher (supprimer) un message
     */
    hide: function ($messageToDelete) {
        $messageToDelete.remove();
    },
}