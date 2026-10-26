import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FAILURE_REPO, IAC_REPO, IAC_STAGES, IAC_TEMPLATE, RUN_RESULTS } from "@/lib/data/lab";
import { Rails, SheetZones, SubHead, gutter } from "../section";
import Reveal from "../reveal";
import Code from "../code";
import FailureReplay from "../lab/failure-replay";
import { nudgeOut } from "../ui";

const RepoLink = ({ href, label }: { href: string; label: string }) =>
    href ? (
        <a href={href} target="_blank" rel="noreferrer" className="group mt-6 inline-flex items-center gap-2.5 border-b border-line-strong pb-1 text-[15px] font-medium text-ink hover:border-accent">
            <FaGithub aria-hidden="true" className="h-4 w-4" />
            {label}
            <ArrowUpRight aria-hidden="true" className={`${nudgeOut} text-ink-3 group-hover:text-accent`} />
            <span className="sr-only">(opens in a new tab)</span>
        </a>
    ) : null;

const Point = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <li className="border-t border-line pt-3">
        <p className="text-[14.5px] font-semibold text-ink">{title}</p>
        <p className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{children}</p>
    </li>
);

const LabSection = () => (
    <section id="lab" aria-labelledby="lab-title" tabIndex={-1} className="outline-none">
        <Rails>
            <SheetZones sheet="Sheet 04 — Lab" />
            <Reveal as="header" className={`grid gap-y-5 pb-6 pt-12 lg:grid-cols-12 lg:gap-x-8 lg:pt-16 ${gutter}`}>
                <p className="font-mono text-[12px] text-ink-3 lg:col-span-3 lg:pt-3">
                    <span className="text-accent">04</span> / Coursework · AWS
                </p>
                <div className="lg:col-span-9">
                    <h2 id="lab-title" className="max-w-[20ch] text-[clamp(2.1rem,1.5rem+2.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
                        Infrastructure, measured rather than assumed.
                    </h2>
                    <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-ink-2">
                        Two Cloud Computing practicals, built with the AWS CLI and run in ap-south-1. Smaller than the projects above, with the same
                        habit: write down what actually happened.
                    </p>
                </div>
            </Reveal>

            {/* 04.1 — failure recovery. */}
            <SubHead index="04.1 — EC2 failure recovery" title="Kill one of two servers and count the requests that fail." className="lg:pt-10" />
            <div className="grid border-t border-line xl:grid-cols-12">
                <Reveal className={`min-w-0 py-10 xl:col-span-4 xl:py-12 ${gutter} xl:pr-8`}>
                    <p className="text-[16px] leading-relaxed text-ink-2">
                        Two instances in different Availability Zones behind an Application Load Balancer, managed by an Auto Scaling group.
                        A script terminates one; a probe outside AWS sends a request every half-second and records who answers.
                    </p>
                    <dl className="mt-8 grid gap-5">
                        {RUN_RESULTS.map((r) => (
                            <div key={r.value}>
                                <dt className="font-display text-[2.6rem] leading-none tracking-[-0.02em] text-ink [font-weight:720]">{r.value}</dt>
                                <dd className="mt-1.5 text-[14px] leading-snug text-ink-2">{r.label}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="mt-6 font-serif text-[16px] italic leading-snug text-ink-3">
                        No downtime observed at a 0.5 s sampling interval — a shorter gap can&apos;t be ruled out.
                    </p>
                    <ul className="mt-8 grid gap-4">
                        <Point title="A failure script that refuses to cause an outage">
                            fail-instance.sh checks the target is an in-service member of the group and that another healthy target exists, asks
                            for the full instance ID and then &ldquo;terminate&rdquo;, and re-checks both just before acting. It never terminates the
                            last healthy target.
                        </Point>
                        <Point title="A dashboard that can't touch anything">
                            The page served through the load balancer only answers GET and HEAD, and the instances&apos; IAM role can only describe
                            resources — failure injection happens from the laptop alone.
                        </Point>
                        <Point title="A bug the checks caught">
                            The first cleanup run reported success but left two security groups that referenced each other. An independent
                            post-cleanup check caught it, and cleanup.sh was fixed.
                        </Point>
                    </ul>
                    <RepoLink href={FAILURE_REPO} label="EC2 failure-recovery source" />
                </Reveal>
                <Reveal delay={0.06} className="relative min-w-0 border-t border-line bg-inset px-3 py-10 sm:px-8 xl:col-span-8 xl:border-l xl:border-t-0 xl:px-10 xl:py-12">
                    <div className="blueprint fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
                    <figure className="relative">
                        <FailureReplay />
                        <figcaption className="mt-6 max-w-[72ch] font-serif text-[16px] italic leading-snug text-ink-3">
                            Fig. 5 — The run on 16 October 2026, replayed at 22× from its report: AWS activity records, the dashboard&apos;s state polls and an
                            independent HTTP probe. Drag the line to scrub.
                        </figcaption>
                    </figure>
                </Reveal>
            </div>

            {/* 04.2 — infrastructure as code. */}
            <div className="border-t border-line">
                <SubHead index="04.2 — Infrastructure as code" title="One bucket, provisioned the reviewable way." />
            </div>
            <div className="grid border-t border-line xl:grid-cols-12">
                <Reveal className={`min-w-0 py-10 xl:col-span-4 xl:py-12 ${gutter} xl:pr-8`}>
                    <p className="text-[16px] leading-relaxed text-ink-2">
                        A CloudFormation template for a private, encrypted, versioned S3 bucket that only accepts HTTPS — created and updated
                        through change sets, so every change is reviewed before it runs, then checked for drift.
                    </p>
                    <ul className="mt-8 grid gap-4">
                        <Point title="Nothing hard-coded">
                            The bucket name is built from parameters and the AWS::AccountId pseudo-parameter; no keys or account details live in the
                            template.
                        </Point>
                        <Point title="A deploy script that cleans up after itself">
                            A declined or interrupted change set leaves an empty stack behind. deploy.sh deletes it — but only after confirming
                            it&apos;s the exact placeholder this run created.
                        </Point>
                    </ul>
                    <RepoLink href={IAC_REPO} label="CloudFormation source" />
                </Reveal>
                <Reveal delay={0.06} className={`min-w-0 border-t border-line py-10 xl:col-span-8 xl:border-l xl:border-t-0 xl:py-12 ${gutter} xl:px-10`}>
                    <figure>
                        <ol className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-5">
                            {IAC_STAGES.map((stage, i) => (
                                <li key={stage.label} className="bg-canvas px-3 py-3">
                                    <p className="font-mono text-[11px] text-ink-3">{String(i + 1).padStart(2, "0")}</p>
                                    <p className="mt-1 text-[13.5px] font-medium leading-snug text-ink">{stage.label}</p>
                                    {stage.state && <p className={`mt-1.5 font-mono text-[11px] ${stage.state === "review" ? "text-warn" : "text-ok"}`}>{stage.state}</p>}
                                </li>
                            ))}
                        </ol>
                        <Code code={IAC_TEMPLATE} file="templates/s3-bucket.yaml" mark={[9, 10, 11, 12, 13, 14, 18, 19]} className="mt-6" />
                        <figcaption className="mt-5 font-serif text-[16px] italic text-ink-3">
                            Fig. 6 — The stack&apos;s life so far, and the parts of the template that make the bucket private.
                        </figcaption>
                    </figure>
                </Reveal>
            </div>
        </Rails>
    </section>
);

export default LabSection;
