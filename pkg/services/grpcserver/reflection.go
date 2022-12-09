package grpcserver

import (
	"context"

	"github.com/grafana/dskit/services"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/setting"

	"google.golang.org/grpc/reflection"
	"google.golang.org/grpc/reflection/grpc_reflection_v1alpha"
)

// ReflectionService implements the gRPC Server Reflection Protocol:
// https://github.com/grpc/grpc/blob/master/doc/server-reflection.md
type ReflectionService struct {
	*services.BasicService
	cfg                *setting.Cfg
	log                log.Logger
	reflectionServer   *reflectionServer
	grpcServerProvider Provider
}

type reflectionServer struct {
	grpc_reflection_v1alpha.ServerReflectionServer
}

// AuthFuncOverride no auth for reflection service.
func (s *reflectionServer) AuthFuncOverride(ctx context.Context, _ string) (context.Context, error) {
	return ctx, nil
}

func ProvideReflectionService(cfg *setting.Cfg, grpcServerProvider Provider) (*ReflectionService, error) {
	re := &reflectionServer{reflection.NewServer(reflection.ServerOptions{Services: grpcServerProvider.GetServer()})}
	s := &ReflectionService{
		cfg:                cfg,
		log:                log.New("grpc-server-reflection"),
		reflectionServer:   re,
		grpcServerProvider: grpcServerProvider,
	}
	s.BasicService = services.NewIdleService(nil, nil)
	grpc_reflection_v1alpha.RegisterServerReflectionServer(grpcServerProvider.GetServer(), re)
	return s, nil
}