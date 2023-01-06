import * as React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import withI18n, { HasI18n } from "../hoc/withI18n";
import TermItState from "../../model/TermItState";
import User from "../../model/User";
import ProfileView from "./ProfileView";
import HeaderWithActions from "../misc/HeaderWithActions";
import { Card, CardBody } from "reactstrap";
import WindowTitle from "../misc/WindowTitle";
import UserRoles from "../administration/UserRoles";

interface ProfileProps extends HasI18n {
  user: User;
}

interface ProfileState {
  firstName: string;
  lastName: string;
  edit: boolean;
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      edit: false,
    };
  }

  public render() {
    const { i18n, user } = this.props;

    return (
      <>
        <WindowTitle title={i18n("main.user-profile")} />
        <HeaderWithActions
          title={
            <>
              {i18n("main.user-profile")}: {user.username}
              <div className="small italics">
                <UserRoles user={user} />
              </div>
            </>
          }
        />
        <Card id="panel-profile">
          <CardBody>
            <ProfileView user={user} />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default connect((state: TermItState) => {
  return {
    user: state.user,
  };
})(injectIntl(withI18n(Profile)));
