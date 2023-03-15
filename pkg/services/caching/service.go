package caching

import (
	"context"
	"errors"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana/pkg/api/dtos"
)

var (
	ErrCachingNotAvailable = errors.New("query caching is not available in OSS Grafana")
)

type CacheResponseFn func(context.Context, *backend.QueryDataResponse)
type CacheStatus int

const (
	StatusNotFound CacheStatus = iota + 1
	StatusCacheHit
	StatusCacheError
)

type CachedDataResponse struct {
	Response      *backend.QueryDataResponse
	Status        CacheStatus
	UpdateCacheFn CacheResponseFn
}

func ProvideCachingService() *OSSCachingService {
	return &OSSCachingService{}
}

type CachingService interface {
	HandleQueryRequest(context.Context, dtos.MetricRequest) (CachedDataResponse, error)
	HandleResourceRequest(context.Context) (*backend.QueryDataResponse, bool, CacheResponseFn, error)
}

// Implementation of interface
type OSSCachingService struct {
}

func (s *OSSCachingService) HandleQueryRequest(ctx context.Context, req dtos.MetricRequest) (CachedDataResponse, error) {
	return CachedDataResponse{}, ErrCachingNotAvailable
}

func (s *OSSCachingService) HandleResourceRequest(ctx context.Context) (*backend.QueryDataResponse, bool, CacheResponseFn, error) {
	return nil, false, nil, ErrCachingNotAvailable
}

var _ CachingService = &OSSCachingService{}