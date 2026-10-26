// Entity–relationship diagram of the University Management System, drawn from
// the Drizzle schema in the backend repository (src/db/schema/app.ts, plus the
// Better Auth `user` table in auth.ts). Crow's-foot notation: the bar marks the
// "one" side of a relationship, the three prongs the "many" side.
//
// Two layouts — wide from md up, stacked on phones — so the 11px labels are
// drawn at roughly 1:1 instead of being scaled down to illegibility.

type Key = "pk" | "fk" | "unique" | "enum" | "";
type EntityId = "departments" | "subjects" | "classes" | "enrollments" | "user";
type Point = [number, number];

const ENTITIES: Record<EntityId, [field: string, key: Key][]> = {
    departments: [["id", "pk"], ["code", "unique"], ["name", ""]],
    subjects: [["id", "pk"], ["department_id", "fk"], ["code", "unique"]],
    classes: [["id", "pk"], ["subject_id", "fk"], ["teacher_id", "fk"], ["invite_code", "unique"], ["status", "enum"]],
    enrollments: [["id", "pk"], ["student_id", "fk"], ["class_id", "fk"]],
    user: [["id", "pk"], ["email", ""], ["role", "enum"]],
};

const HEAD = 28;
const ROW = 20;
const boxHeight = (id: EntityId) => HEAD + 8 + ENTITIES[id].length * ROW;

interface Layout {
    width: number;
    height: number;
    boxes: Record<EntityId, { x: number; y: number; w: number }>;
    // Each link runs from the "one" side to the "many" side.
    links: { points: Point[]; label?: { text: string; at: Point } }[];
    legend: Point;
}

const WIDE: Layout = {
    width: 640,
    height: 364,
    boxes: {
        departments: { x: 8, y: 20, w: 176 },
        subjects: { x: 232, y: 20, w: 176 },
        classes: { x: 456, y: 20, w: 176 },
        user: { x: 232, y: 252, w: 176 },
        enrollments: { x: 456, y: 252, w: 176 },
    },
    links: [
        { points: [[184, 62], [208, 62], [208, 82], [232, 82]] },
        { points: [[408, 62], [432, 62], [432, 82], [456, 82]] },
        { points: [[544, 156], [544, 252]], label: { text: "class_id", at: [552, 208] } },
        { points: [[408, 294], [432, 294], [432, 314], [456, 314]] },
        { points: [[320, 252], [320, 204], [500, 204], [500, 156]], label: { text: "teacher_id", at: [330, 197] } },
    ],
    legend: [8, 262],
};

const STACKED: Layout = {
    width: 320,
    height: 700,
    boxes: {
        departments: { x: 4, y: 8, w: 176 },
        subjects: { x: 4, y: 144, w: 176 },
        classes: { x: 4, y: 280, w: 176 },
        enrollments: { x: 4, y: 468, w: 176 },
        user: { x: 192, y: 392, w: 124 },
    },
    links: [
        { points: [[92, 104], [92, 144]] },
        { points: [[92, 240], [92, 280]] },
        { points: [[92, 416], [92, 468]] },
        { points: [[254, 392], [254, 362], [180, 362]], label: { text: "teacher_id", at: [188, 355] } },
        { points: [[254, 488], [254, 530], [180, 530]], label: { text: "student_id", at: [188, 523] } },
    ],
    legend: [4, 600],
};

const unit = ([ax, ay]: Point, [bx, by]: Point): Point => {
    const len = Math.hypot(bx - ax, by - ay) || 1;
    return [(bx - ax) / len, (by - ay) / len];
};

// Three prongs fanning out onto the entity edge at `end`, coming from `from`.
const crowFoot = (from: Point, end: Point) => {
    const [dx, dy] = unit(from, end);
    const [nx, ny] = [-dy, dx];
    const [bx, by] = [end[0] - dx * 10, end[1] - dy * 10];
    return `M${bx},${by} L${end[0] + nx * 5.5},${end[1] + ny * 5.5} M${bx},${by} L${end[0]},${end[1]} M${bx},${by} L${end[0] - nx * 5.5},${end[1] - ny * 5.5}`;
};

// A single bar just off the entity edge at `start`, heading toward `toward`.
const oneBar = (start: Point, toward: Point) => {
    const [dx, dy] = unit(start, toward);
    const [nx, ny] = [-dy, dx];
    const [cx, cy] = [start[0] + dx * 7, start[1] + dy * 7];
    return `M${cx + nx * 5},${cy + ny * 5} L${cx - nx * 5},${cy - ny * 5}`;
};

const keyClass: Record<Key, string> = {
    pk: "fill-accent",
    fk: "fill-ink-2",
    unique: "fill-ink-3",
    enum: "fill-ink-3",
    "": "fill-ink-3",
};

const Diagram = ({ layout, id, className }: { layout: Layout; id: string; className: string }) => {
    const [lx, ly] = layout.legend;
    return (
        <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            role="img"
            aria-labelledby={`${id}-title ${id}-desc`}
            className={`h-auto w-full font-mono ${className}`}
        >
            <title id={`${id}-title`}>University Management System database schema</title>
            <desc id={`${id}-desc`}>
                Departments have many subjects; subjects have many classes; each class has one teacher, who is a user, and a
                unique invite code. Enrollments link a student user to a class. Users have a role of student, teacher or admin,
                and classes have a status of active, inactive or archived.
            </desc>

            {/* Relationships, drawn first so the tables sit on top of them. */}
            <g className="fill-none stroke-ink-3" strokeWidth={1}>
                {layout.links.map(({ points }, i) => (
                    <g key={i}>
                        <polyline points={points.map((p) => p.join(",")).join(" ")} />
                        <path d={oneBar(points[0], points[1])} />
                        <path d={crowFoot(points[points.length - 2], points[points.length - 1])} />
                    </g>
                ))}
            </g>
            {layout.links.map(({ label }, i) =>
                label ? (
                    <text key={i} x={label.at[0]} y={label.at[1]} fontSize={10.5} className="fill-ink-3">
                        {label.text}
                    </text>
                ) : null
            )}

            {(Object.keys(layout.boxes) as EntityId[]).map((entity) => {
                const { x, y, w } = layout.boxes[entity];
                const h = boxHeight(entity);
                return (
                    <g key={entity}>
                        <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} rx={2} className="fill-surface stroke-line-strong" />
                        <path d={`M${x + 0.5},${y + HEAD} H${x + w - 0.5}`} className="stroke-line-strong" />
                        <text x={x + 12} y={y + 18.5} fontSize={12} className="fill-ink" fontWeight={600}>
                            {entity}
                        </text>
                        {ENTITIES[entity].map(([field, key], i) => (
                            <g key={field} fontSize={11}>
                                <text x={x + 12} y={y + HEAD + 4 + i * ROW + 14} className="fill-ink-2">
                                    {field}
                                </text>
                                {key && (
                                    <text x={x + w - 12} y={y + HEAD + 4 + i * ROW + 14} textAnchor="end" className={keyClass[key]}>
                                        {key}
                                    </text>
                                )}
                            </g>
                        ))}
                    </g>
                );
            })}

            <g fontSize={11}>
                <text x={lx} y={ly + 10} className="fill-ink-3">enum role</text>
                <text x={lx} y={ly + 28} className="fill-ink-2">student · teacher · admin</text>
                <text x={lx} y={ly + 54} className="fill-ink-3">enum class_status</text>
                <text x={lx} y={ly + 72} className="fill-ink-2">active · inactive · archived</text>
                <g className="fill-none stroke-ink-3">
                    <path d={`M${lx},${ly + 92} H${lx + 34}`} />
                    <path d={oneBar([lx, ly + 92], [lx + 34, ly + 92])} />
                    <path d={crowFoot([lx, ly + 92], [lx + 34, ly + 92])} />
                </g>
                <text x={lx + 44} y={ly + 96} className="fill-ink-3">one to many</text>
            </g>
        </svg>
    );
};

const SchemaDiagram = () => (
    <figure className="mx-auto w-full min-w-0">
        <Diagram layout={WIDE} id="ums-schema-wide" className="mx-auto hidden max-w-[44rem] md:block" />
        <Diagram layout={STACKED} id="ums-schema-stacked" className="mx-auto max-w-[22rem] md:hidden" />
        <figcaption className="mt-6 text-center font-serif text-[16px] italic text-ink-3">
            Fig. 2 — The data model, drawn from the Drizzle schema in backend/src/db/schema.
        </figcaption>
    </figure>
);

export default SchemaDiagram;
