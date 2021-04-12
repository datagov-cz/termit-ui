import * as React from "react";
import { UncontrolledTooltip } from "reactstrap";
import Toggle from "react-bootstrap-toggle";
import { useI18n } from "../hook/useI18n";

interface DraftToggleProps {
  id: string; // Toggle id, required by the tooltip component
  draft: boolean; // whether the component is in the draft version;
  onToggle: () => void;
}

const DraftToggle: React.FC<DraftToggleProps> = (props) => {
  const { i18n } = useI18n();
  return (
    <>
      <Toggle
        id={props.id}
        onClick={() => props.onToggle()}
        on={i18n("term.metadata.status.confirmed")}
        off={i18n("term.metadata.status.draft")}
        onstyle="primary"
        offstyle="secondary"
        size="sm"
        handleClassName="toggle-handle-custom"
        style={{ height: "calc(1.5 * 0.875rem + 0.5rem + 2px)" }}
        active={!props.draft}
        recalculateOnResize={false}
      />
      <UncontrolledTooltip target={props.id}>
        {i18n("term.metadata.status.help")}
      </UncontrolledTooltip>
    </>
  );
};

export default DraftToggle;
