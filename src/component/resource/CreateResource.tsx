import * as React from "react";
import {injectIntl} from "react-intl";
import withI18n, {HasI18n} from "../hoc/withI18n";
import Routing from "../../util/Routing";
import Routes from "../../util/Routes";
import IdentifierResolver from "../../util/IdentifierResolver";
import HeaderWithActions from "../misc/HeaderWithActions";
import WindowTitle from "../misc/WindowTitle";
import CreateResourceForm from "./CreateResourceForm";
import withLoading from "../hoc/withLoading";

interface CreateResourceProps extends HasI18n {
}

export const CreateResource: React.FC<CreateResourceProps> = (props: CreateResourceProps) => {

    const onSuccess = (iri: string) => {
        Routing.transitionTo(Routes.resourceSummary, IdentifierResolver.routingOptionsFromLocation(iri));
    };

    const onCancel = () => {
        Routing.transitionTo(Routes.resources);
    }

    const i18n = props.i18n;
    return <>
        <WindowTitle title={i18n("resource.create.title")}/>
        <HeaderWithActions title={i18n("resource.create.title")}/>
        <CreateResourceForm onCancel={onCancel}
                            onSuccess={onSuccess}
                            justDocument={false}/>
    </>
}

export default injectIntl(withI18n(withLoading(CreateResource)));
