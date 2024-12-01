interface KlarnaPayments {
  init: (config: { client_token: string }) => Promise<void>;
  load: (config: {
    container: string;
  }, data?: any, callback?: (res: any) => void) => Promise<void>;
  authorize: (
    config: any,
    data: any,
    callback?: (res: any) => void
  ) => Promise<void>;
}

interface Klarna {
  Payments: KlarnaPayments;
}

interface Window {
  Klarna?: Klarna;
  klarnaAsyncCallback?: () => void;
}