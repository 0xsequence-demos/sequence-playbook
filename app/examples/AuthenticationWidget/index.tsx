
    import { steps } from './AuthenticationWidgetSnippet';
    import { codeString } from './AuthenticationWidgetString';
    import { AuthenticationWidget as example, loader, action } from './AuthenticationWidget';

    export const AuthenticationWidget = Object.assign(example, {
      steps,
      id: "AuthenticationWidget",
      String:codeString
      , loader
      , action
    });
  