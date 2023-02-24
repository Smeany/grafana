// Code generated - EDITING IS FUTILE. DO NOT EDIT.
//
// Generated by:
//     kinds/gen.go
// Using jennies:
//     CRDTypesJenny
//
// Run 'make gen-cue' from repository root to regenerate.

package dashboard

import (
	_ "embed"
	"fmt"

	"github.com/grafana/grafana/pkg/kinds/dashboard"
	"github.com/grafana/grafana/pkg/registry/corekind"
	"github.com/grafana/grafana/pkg/services/k8s/crd"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
)

var coreReg = corekind.NewBase(nil)
var Kind = coreReg.Dashboard()

var CRD = crd.Kind{
	GrafanaKind: Kind,
	Object:      &Dashboard{},
	ObjectList:  &DashboardList{},
}

// The CRD YAML representation of the Dashboard kind.
//
//go:embed crd_gen.yml
var CRDYaml []byte

// Dashboard is the Go CRD representation of a single Dashboard object.
// It implements [runtime.Object], and is used in k8s scheme construction.
type Dashboard struct {
	crd.Base[dashboard.Dashboard]
}

// DashboardList is the Go CRD representation of a list Dashboard objects.
// It implements [runtime.Object], and is used in k8s scheme construction.
type DashboardList struct {
	crd.ListBase[dashboard.Dashboard]
}

// fromUnstructured converts an *unstructured.Unstructured object to a *Dashboard.
func fromUnstructured(obj any) (*Dashboard, error) {
	uObj, ok := obj.(*unstructured.Unstructured)
	if !ok {
		return nil, fmt.Errorf("failed to convert to *unstructured.Unstructured")
	}

	var dashboard crd.Base[dashboard.Dashboard]
	err := runtime.DefaultUnstructuredConverter.FromUnstructured(uObj.UnstructuredContent(), &dashboard)
	if err != nil {
		return nil, fmt.Errorf("failed to convert to Dashboard: %w", err)
	}

	return &Dashboard{dashboard}, nil
}

// toUnstructured converts a Dashboard to an *unstructured.Unstructured.
func toUnstructured(obj *dashboard.Dashboard, metadata metav1.ObjectMeta) (*unstructured.Unstructured, error) {
	dashboardObj := crd.Base[dashboard.Dashboard]{
		TypeMeta: metav1.TypeMeta{
			Kind:       CRD.GVK().Kind,
			APIVersion: CRD.GVK().Group + "/" + CRD.GVK().Version,
		},
		ObjectMeta: metadata,
		Spec:       *obj,
	}

	out, err := runtime.DefaultUnstructuredConverter.ToUnstructured(&dashboardObj)
	if err != nil {
		return nil, err
	}

	return &unstructured.Unstructured{
		Object: out,
	}, nil
}