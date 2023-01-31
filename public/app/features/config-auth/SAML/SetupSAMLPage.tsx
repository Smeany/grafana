import { css } from '@emotion/css';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { GrafanaTheme2, NavModelItem } from '@grafana/data';
import { locationService } from '@grafana/runtime';
import { Button, useStyles2 } from '@grafana/ui';
import { Page } from 'app/core/components/Page/Page';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';
import { StoreState } from 'app/types';

import { loadSettings } from '../state/actions';
import { samlStepChanged } from '../state/reducers';
import { selectSamlConfig } from '../state/selectors';
import { getEnabledAuthProviders } from '../utils';

import { SAMLStepAssertionMapping } from './SAMLStepAssertionMapping';
import { SAMLStepConnectToIdP } from './SAMLStepConnectToIdP';
import { SAMLStepGeneral } from './SAMLStepGeneral';
import { SAMLStepKeyCert } from './SAMLStepKeyCert';
import { SAMLStepSelector } from './SAMLStepSelector';

interface QueryParams {
  step?: string;
}

interface OwnProps extends GrafanaRouteComponentProps<{}, QueryParams> {}

export type Props = OwnProps & ConnectedProps<typeof connector>;

function mapStateToProps(state: StoreState) {
  return {
    settings: state.authConfig.settings,
    samlSettings: selectSamlConfig(state.authConfig),
    step: state.authConfig.samlStep,
  };
}

const mapDispatchToProps = {
  loadSettings,
  samlStepChanged,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const pageNav: NavModelItem = {
  text: 'Setup SAML 2.0 Single Sign On',
  subTitle: `This configurator will guide you throug the process of configuration of SAML 2.0. You will need to follow
    steps and visit Identity Provider's applicatation to connect it with Grafana (Service Provider). You can
    track you progress.`,
  icon: 'shield',
  id: 'SAML',
  breadcrumbs: [{ title: 'Authentication', url: 'admin/authentication' }],
};

export const SetupSAMLPageUnconnected = ({
  settings,
  samlSettings,
  step,
  loadSettings,
  queryParams,
  samlStepChanged,
}: Props): JSX.Element => {
  const styles = useStyles2(getStyles);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const onStepChange = (step: number) => {
    samlStepChanged(step);
    locationService.partial({ step });
  };

  const enabledAuthProviders = getEnabledAuthProviders(settings);
  console.log(enabledAuthProviders);

  step = Number(queryParams.step) || step;

  return (
    <Page navId="authentication" pageNav={pageNav}>
      <Page.Contents>
        <div className={styles.stepSelector}>
          <SAMLStepSelector step={step} onChange={onStepChange} />
        </div>
        {step === 1 && <SAMLStepGeneral />}
        {step === 2 && <SAMLStepKeyCert />}
        {step === 3 && <SAMLStepConnectToIdP />}
        {step === 4 && <SAMLStepAssertionMapping />}
        <Button onClick={() => onStepChange(step + 1)}>Next</Button>
      </Page.Contents>
    </Page>
  );
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    cardsContainer: css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
      gap: ${theme.spacing(3)};
    `,
    stepSelector: css`
      margin-bottom: ${theme.spacing(4)};
    `,
  };
};

const SetupSAMLPage = connector(SetupSAMLPageUnconnected);
export default SetupSAMLPage;