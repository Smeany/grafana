import React, { PureComponent } from 'react';
import classNames from 'classnames';

import config from 'app/core/config';
import { PanelPlugin } from 'app/types/plugins';
import CustomScrollbar from 'app/core/components/CustomScrollbar/CustomScrollbar';
import _ from 'lodash';

interface Props {
  currentType: string;
  onTypeChanged: (newType: PanelPlugin) => void;
}

interface State {
  pluginList: PanelPlugin[];
}

export class VizTypePicker extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      pluginList: this.getPanelPlugins(''),
    };
  }

  getPanelPlugins(filter) {
    const panels = _.chain(config.panels)
      .filter({ hideFromList: false })
      .map(item => item)
      .value();

    // add sort by sort property
    return _.sortBy(panels, 'sort');
  }

  renderVizPlugin = (plugin, index) => {
    const cssClass = classNames({
      'viz-picker__item': true,
      'viz-picker__item--selected': plugin.id === this.props.currentType,
    });

    return (
      <div key={index} className={cssClass} onClick={() => this.props.onTypeChanged(plugin)} title={plugin.name}>
        <div className="viz-picker__item-name">{plugin.name}</div>
        <img className="viz-picker__item-img" src={plugin.info.logos.small} />
      </div>
    );
  };

  renderFilters() {
    return (
      <>
        <label className="gf-form--has-input-icon">
          <input type="text" className="gf-form-input width-13" placeholder="" />
          <i className="gf-form-input-icon fa fa-search" />
        </label>
        <div>
          <button className="btn toggle-btn gf-form-btn active">Basic Types</button>
          <button className="btn toggle-btn gf-form-btn">Master Types</button>
        </div>
      </>
    );
  }

  render() {
    const { currentType } = this.props;
    const { pluginList } = this.state;

    return (
      <div className="viz-picker">
        <div className="viz-picker__bar">
          <label className="gf-form-label">Visualization</label>
          <label className="gf-form-input width-10">
            <span>{currentType}</span>
          </label>
          <div className="gf-form--grow" />
          {this.renderFilters()}
        </div>

        <CustomScrollbar>
          <div className="viz-picker__items">{pluginList.map(this.renderVizPlugin)}</div>
        </CustomScrollbar>
      </div>
    );
  }
}
