import * as React from "react";
import {Register} from "../Register";
import {intlFunctions} from "../../../__tests__/environment/IntlUtil";
import ActionType, {AsyncFailureAction} from "../../../action/ActionType";
import Authentication from "../../../util/Authentication";
import {flushPromises, mountWithIntl} from "../../../__tests__/environment/Environment";
import {act} from "react-dom/test-utils";

jest.mock("../../../util/Routing");
jest.mock("../../../util/Ajax");
jest.mock("../../../util/Authentication");
jest.mock("reactstrap/lib/UncontrolledTooltip");

describe("Registration", () => {

    let register: ({}) => Promise<AsyncFailureAction>;

    beforeEach(() => {
        register = jest.fn().mockImplementation(() => Promise.resolve({type: ActionType.LOGIN}));
    });

    it("clears potentially existing JWT on mount", async () => {
        mountWithIntl(<Register loading={false} register={register} {...intlFunctions()}/>);
        await act(async () => {
            await flushPromises();
        });
        expect(Authentication.clearToken).toHaveBeenCalled();
    });
});
