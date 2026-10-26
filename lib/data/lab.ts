// Infrastructure experiments (Cloud Computing practicals). Facts are from each
// repository's README and scripts; the failure-recovery timings and counts are
// from that experiment's run report (build/report.html, 16 Oct 2026, ap-south-1).
//
// Repository links are deliberately empty: both READMEs currently include the
// AWS account ID. Scrub it, then paste the URL here and the link appears.

export const FAILURE_REPO = "";
export const IAC_REPO = "";

// Seconds after the HTTP probe started (15:01:30 UTC).
export const RUN_START = { h: 15, m: 1, s: 30 };
export const RUN_LENGTH = 382;

export const RUN_EVENTS = [
    { t: 0, source: "HTTP probe", text: "Probe starts: one request every 0.5 s, 3 s timeout" },
    { t: 156, source: "ASG activity", text: "Termination of EC2-1 requested by fail-instance.sh" },
    { t: 157.25, source: "HTTP probe", text: "Last response from EC2-1 (one in-flight request while draining)" },
    { t: 159, source: "Dashboard", text: "Healthy targets 2 → 1" },
    { t: 164, source: "ASG activity", text: "Replacement launched in ap-south-1a; capacity back to 2" },
    { t: 173, source: "/api/state", text: "Replacement running and registered; health checks in progress" },
    { t: 178, source: "/api/state", text: "EC2-1 deregistered; EC2 state shutting-down" },
    { t: 218, source: "ASG activity", text: "EC2-1 terminated" },
    { t: 332, source: "/api/state", text: "Replacement passes health checks: 2 / 2 healthy targets" },
    { t: 382, source: "HTTP probe", text: "Probe stops" },
];

// Requests answered, per window, from the independent probe. Nothing failed.
export const RUN_WINDOWS = [
    { from: 0, to: 156, served: { ec2a: 144, ec2b: 163, repl: 0 } },
    { from: 156, to: 332, served: { ec2a: 1, ec2b: 346, repl: 0 } },
    { from: 332, to: 382, served: { ec2a: 0, ec2b: 51, repl: 49 } },
];

export const RUN_RESULTS = [
    { value: "754 / 754", label: "probe requests answered with HTTP 200 — none failed" },
    { value: "≈ 8 s", label: "from the termination request to a replacement launching" },
    { value: "≈ 2 min 56 s", label: "until two healthy targets were serving again" },
];

export const IAC_STAGES = [
    { label: "validate-template", state: "" },
    { label: "create change set", state: "review" },
    { label: "execute", state: "CREATE_COMPLETE" },
    { label: "versioning update", state: "UPDATE_COMPLETE" },
    { label: "detect drift", state: "IN_SYNC" },
];

export const IAC_TEMPLATE = `ProjectBucket:
  Type: AWS::S3::Bucket
  DeletionPolicy: Delete
  Properties:
    BucketName: !Sub "\${ProjectName}-\${Environment}-\${AWS::AccountId}-\${AWS::Region}"
    BucketEncryption:
      ServerSideEncryptionConfiguration:
        - ServerSideEncryptionByDefault:
            SSEAlgorithm: AES256
    PublicAccessBlockConfiguration:
      BlockPublicAcls: true
      BlockPublicPolicy: true
      IgnorePublicAcls: true
      RestrictPublicBuckets: true
    …
    # Keep every version of each object, so overwritten or deleted objects
    # can be recovered. (Stage 3 update.)
    VersioningConfiguration:
      Status: Enabled`;
