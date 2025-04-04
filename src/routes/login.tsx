import { actions } from "@/redux/actions";
import { useAppDispatch } from "@/redux/store";
import { Link, RouteComponentProps } from "@reach/router";
import { SigninTemplate } from "@sitemapy/ui";
import React from "react";
import { useIntl } from "react-intl";

export const LoginRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  return (
    <SigninTemplate
      title={intl.formatMessage({ id: "login/title" })}
      description={intl.formatMessage({ id: "login/description" })}
      separatorText={intl.formatMessage({ id: "login/separatorText" })}
      googleButtonText={intl.formatMessage({
        id: "login/loginWithGoogleText",
      })}
      emailLabel={intl.formatMessage({ id: "login/emailLabel" })}
      passwordLabel={intl.formatMessage({ id: "login/passwordLabel" })}
      forgotPasswordText={intl.formatMessage({
        id: "login/forgotPasswordText",
      })}
      invalidEmailText={intl.formatMessage({ id: "login/invalidEmailText" })}
      invalidPasswordText={intl.formatMessage({
        id: "login/invalidPasswordText",
      })}
      onGoogleButtonClick={() => {
        alert("Not implemented");
      }}
      signupText={intl.formatMessage(
        { id: "login/signupText" },
        {
          a: (chunks) => <Link to="/signup">{chunks}</Link>,
        }
      )}
      loginButtonText={intl.formatMessage({ id: "login/loginButtonText" })}
      acceptTermsText={intl.formatMessage(
        { id: "login/acceptTermsText" },
        {
          terms: (chunks) => <Link to="/terms">{chunks}</Link>,
          privacy: (chunks) => <Link to="/privacy">{chunks}</Link>,
        }
      )}
      onSubmit={({ email, password }) => {
        dispatch(actions.authentication.login({ email, password }));
      }}
    />
  );
};
