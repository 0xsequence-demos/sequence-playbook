
    import { steps } from './MintTokenWidgetSnippet';
    import { codeString } from './MintTokenWidgetString';
    import { MintTokenWidget as example, loader, action } from './MintTokenWidget';

    export const MintTokenWidget = Object.assign(example, {
      steps,
      id: "MintTokenWidget",
      String:codeString
      , loader
      , action
    });
  