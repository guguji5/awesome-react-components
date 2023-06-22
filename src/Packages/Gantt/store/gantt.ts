export interface GanttDataType {
  _id: string;
  start_time: number;
  end_time: number;
  last_time: number;
  time_window: number;
  incident_status: GanttSeverity;
  incident_severity: GanttSeverity;
  labels: object;
  tips: object;
  corr_rule_id: string;
  window_end: number;
}

export enum GanttSeverity {
  CRITICAL = 'critical',
  WARNING = 'warning',
  INFO = 'info',
  OK = 'ok',
}

export const GanttCircleOKColor = '#B6E39F';

export const GanttCircleColorMap = new Map<GanttSeverity, string>([
  [GanttSeverity.CRITICAL, '#FD9891'],
  [GanttSeverity.WARNING, '#FBB595'],
  [GanttSeverity.INFO, 'skyblue'],
  [GanttSeverity.OK, '#B6E39F'],
]);
