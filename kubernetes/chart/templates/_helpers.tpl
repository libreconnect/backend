{{- define "my-backend.name" -}}
{{- .Chart.Name -}}
{{- end -}}

{{- define "my-backend.fullname" -}}
{{- printf "%s" .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "my-backend.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
{{- default (include "my-backend.fullname" .) .Values.serviceAccount.name -}}
{{- else -}}
{{- .Values.serviceAccount.name -}}
{{- end -}}
{{- end -}}
