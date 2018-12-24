import {ILoginResponse} from './i-login-response';

export class Authentication {
  private readonly _username: string;
  private readonly _loginResponse: ILoginResponse;

  public static fromLocalStore(value: string): Authentication {
    const json = JSON.parse(value);

    const authentication: ILoginResponse = {
      access_token: json.accessToken,
      expires_in: json.expiresIn,
      token_type: json.tokenType,
      scope: json.scope
    };

    return new Authentication(json.username, authentication);
  }

  constructor(username: string, loginResponse: ILoginResponse) {
    this._username = username;
    this._loginResponse = loginResponse;
  }

  public getUsername(): string {
    return this._username;
  }

  public toLocalStore(): string {
    return JSON.stringify(
      {
        'username': this.getUsername(),
        'accessToken': this.getLoginResponse().access_token,
        'expiresIn': this.getLoginResponse().expires_in,
        'tokenType': this.getLoginResponse().token_type,
        'scope': this.getLoginResponse().scope
      });
  }

  public getToken(): string {
    // TODO improve expiration etc
    return this.getLoginResponse().access_token;
  }

  private getLoginResponse(): ILoginResponse {
    return this._loginResponse;
  }

}
