export interface IApplication {
    /**
     * array de bolas seleccionadas
     */
    selectedBalls: number[],
    /**
     * array con los colores por posicion de cada bola para mantener el mismo patron
     */
    coloursButtons: string[],
    /**
     * cantidad a pagar numerosDeBolasSeleccionadas*cantidadAmount
     */
    amountPay: number,
    /**
     * cantidad usada (es el sumatorio de todos los amountPay),
     * puede ser negativo, por lo cual será que se le debe dinero, por que tiene mejor profit.
     */
    amountUsed: number,
    /**
     * cantidad maxima a gastar
     */
    MAXUSED: number,
    /**
     * cantidad minima para jugar
     */
    MINUSED: number,
    /**
     * variable de control para saber si se ha ganado en la ronda
     * por defecto es -1 si no ha ganado y cualquier otro valor para la bola ganadora
     */
    randomWins: number,
}