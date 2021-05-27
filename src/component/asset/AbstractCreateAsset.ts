import * as React from "react";
import Ajax, { params } from "../../util/Ajax";
import Constants from "../../util/Constants";
import last from "last";

export interface AbstractCreateAssetState {
  iri: string;
  label: string;
  generateIri: boolean;
}

let loadIdentifier = <T extends { name: string; assetType: string }>(
  parameters: T
) => {
  return Ajax.post(`${Constants.API_PREFIX}/identifiers`, params(parameters));
};

// This will cause the existing still running identifier requests to be ignored in favor of the most recent call
loadIdentifier = last(loadIdentifier);

export { loadIdentifier };

/**
 * Abstract asset creation component class.
 *
 * It handles automatic generation of identifier and label setting.
 */
export abstract class AbstractCreateAsset<
  P,
  S extends AbstractCreateAssetState
> extends React.Component<P, S> {
  protected constructor(props: P) {
    super(props);
  }

  /**
   * Defines Type of Asset for identifier generation. one of 'RESOURCE', 'VOCABULARY'.
   */
  protected abstract get assetType(): string;

  protected onLabelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const label = e.currentTarget.value;
    this.setState({ label });
    this.generateIri(label);
  };

  protected generateIri = (label: string): void => {
    if (!this.state.generateIri || label.length === 0) {
      return;
    }
    loadIdentifier({
      name: label,
      assetType: this.assetType,
    }).then((response) => this.setState({ iri: response.data }));
  };

  protected onIriChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      iri: e.currentTarget.value as string,
      generateIri: false,
    });
  };
}
