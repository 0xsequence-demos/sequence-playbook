
    import { steps } from './BuyCryptoWidgetSnippet';
    import { codeString } from './BuyCryptoWidgetString';
    import { BuyCryptoWidget as example, loader, action } from './BuyCryptoWidget';

    export const BuyCryptoWidget = Object.assign(example, {
      steps,
      id: "BuyCryptoWidget",
      String:codeString
      , loader
      , action
    });
  