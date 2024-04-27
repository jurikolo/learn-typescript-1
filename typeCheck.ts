export type Severity = "Critical" | "High" | "Medium" | "Low";

function severityLog(severity: Severity) {
    console.log(severity);
}

severityLog("Critical")