export class BaseCode {
  static get code() {
    const res = SocketMesssageCode.code;
    SocketMesssageCode.code = '';
    return res;
  }
}

export class SocketMesssageCode {
  public static code: string = '';

  private static appendCode(value: string) {
    this.code += value;
  }

  /** Комнаты */
  public static get Room() {
    this.appendCode('Room');
    return class extends BaseCode {
      /** Инициирует инвайт впользователей */
      public static get InviteUsersToRoom() {
        SocketMesssageCode.appendCode('InviteUsersToRoom');
        return class extends BaseCode {};
      }
      /** Пользователь добавлен к комнате */
      public static get InvitedUserToRoom() {
        SocketMesssageCode.appendCode('InvitedUserToRoom');
        return class extends BaseCode {};
      }
      /** Пользователи которыхз выбрал рандомайзер */
      public static get ChoosePlayersReady() {
        SocketMesssageCode.appendCode('ChoosePlayersReady');
        return class extends BaseCode {};
      }
    };
  }
}
