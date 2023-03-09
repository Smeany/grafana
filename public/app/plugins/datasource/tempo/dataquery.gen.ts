// Code generated - EDITING IS FUTILE. DO NOT EDIT.
//
// Generated by:
//     public/app/plugins/gen.go
// Using jennies:
//     TSTypesJenny
//     PluginTSTypesJenny
//
// Run 'make gen-cue' from repository root to regenerate.

import * as common from '@grafana/schema';

export const DataQueryModelVersion = Object.freeze([0, 0]);

export interface TempoQuery extends common.DataQuery {
  filters: Array<TraceqlFilter>;
  /**
   * Defines the maximum number of traces that are returned from Tempo
   */
  limit?: number;
  /**
   * Define the maximum duration to select traces. Use duration format, for example: 1.2s, 100ms
   */
  maxDuration?: string;
  /**
   * Define the minimum duration to select traces. Use duration format, for example: 1.2s, 100ms
   */
  minDuration?: string;
  /**
   * TraceQL query or trace ID
   */
  query: string;
  /**
   * Logfmt query to filter traces by their tags. Example: http.status_code=200 error=true
   */
  search?: string;
  /**
   * Filters to be included in a PromQL query to select data for the service graph. Example: {client="app",service="app"}
   */
  serviceMapQuery?: string;
  /**
   * Query traces by service name
   */
  serviceName?: string;
  /**
   * Query traces by span name
   */
  spanName?: string;
}

export const defaultTempoQuery: Partial<TempoQuery> = {
  filters: [],
};

/**
 * search = Loki search, nativeSearch = Tempo search for backwards compatibility
 */
export type TempoQueryType = ('traceql' | 'traceqlSearch' | 'search' | 'serviceMap' | 'upload' | 'nativeSearch' | 'clear');

/**
 * static fields are pre-set in the UI, dynamic fields are added by the user
 */
export type TraceqlSearchFilterType = ('static' | 'dynamic');

export enum TraceqlSearchScope {
  All = 'all',
  Resource = 'resource',
  Span = 'span',
}

export interface TraceqlFilter {
  /**
   * Uniquely identify the filter, will not be used in the query generation
   */
  id: string;
  /**
   * The operator that connects the tag to the value, for example: =, >, !=, =~
   */
  operator?: string;
  /**
   * The scope of the filter, can either be unscoped/all scopes, resource or span
   */
  scope?: TraceqlSearchScope;
  /**
   * The tag for the search filter, for example: .http.status_code, .service.name, status
   */
  tag?: string;
  /**
   * The type of the filter, can either be static (pre defined in the UI) or dynamic
   */
  type: TraceqlSearchFilterType;
  /**
   * The value for the search filter
   */
  value?: (string | Array<string>);
  /**
   * The type of the value, used for example to check whether we need to wrap the value in quotes when generating the query
   */
  valueType?: string;
}

export interface Tempo {}
