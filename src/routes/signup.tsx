import { actions } from "@/redux/actions";
import { useAppDispatch } from "@/redux/store";
import { Link, RouteComponentProps } from "@reach/router";
import { SignupTemplate } from "@sitemapy/ui";
import React from "react";
import { useIntl } from "react-intl";

export const SignupRoute: React.FC<RouteComponentProps> = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  return (
    <SignupTemplate
      onGoogleButtonClick={() => {
        alert("Not implemented");
      }}
      title={intl.formatMessage({ id: "signup/title" })}
      description={intl.formatMessage({ id: "signup/description" })}
      separatorText={intl.formatMessage({ id: "signup/separatorText" })}
      googleButtonText={intl.formatMessage({
        id: "signup/google",
      })}
      emailLabel={intl.formatMessage({ id: "signup/emailLabel" })}
      passwordLabel={intl.formatMessage({ id: "signup/passwordLabel" })}
      invalidEmailText={intl.formatMessage({ id: "signup/invalidEmailText" })}
      invalidPasswordText={intl.formatMessage({
        id: "signup/invalidPasswordText",
      })}
      signupText={intl.formatMessage(
        { id: "signup/alreadyHaveAccountText" },
        {
          a: (chunks) => <Link to="/login">{chunks}</Link>,
        }
      )}
      loginButtonText={intl.formatMessage({ id: "signup/submitButtonText" })}
      acceptTermsText={intl.formatMessage(
        { id: "signup/acceptTermsText" },
        {
          terms: (chunks) => <a href="/terms">{chunks}</a>,
          privacy: (chunks) => <a href="/privacy">{chunks}</a>,
        }
      )}
      onSubmit={({ email, password }) => {
        dispatch(
          actions.authentication.signup({
            email,
            password,
          })
        );
      }}
      confirmPasswordLabel={intl.formatMessage({
        id: "signup/confirmPasswordLabel",
      })}
      confirmPasswordNotMatchError={intl.formatMessage({
        id: "signup/confirmPasswordNotMatchError",
      })}
    />
  );
};
