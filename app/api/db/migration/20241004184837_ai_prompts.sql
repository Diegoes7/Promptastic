create sequence "public"."prompt_id_seq";

create sequence "public"."user_id_seq";

create table "public"."accounts" (
    "id" uuid not null default uuid_generate_v4(),
    "userId" uuid not null,
    "type" character varying not null,
    "provider" character varying not null,
    "providerAccountId" character varying not null,
    "refresh_token" character varying,
    "access_token" character varying,
    "expires_at" bigint,
    "token_type" character varying,
    "scope" character varying,
    "id_token" character varying,
    "session_state" character varying
);


create table "public"."prompt" (
    "id" integer not null default nextval('prompt_id_seq'::regclass),
    "prompt" character varying not null,
    "title" character varying not null,
    "tag" character varying not null,
    "creatorId" integer
);


alter table "public"."prompt" enable row level security;

create table "public"."sessions" (
    "id" uuid not null default uuid_generate_v4(),
    "sessionToken" character varying not null,
    "userId" uuid not null,
    "expires" character varying not null
);


create table "public"."user" (
    "id" integer not null default nextval('user_id_seq'::regclass),
    "username" character varying,
    "email" character varying not null,
    "password" character varying,
    "picture" character varying,
    "createdAt" timestamp without time zone not null default now(),
    "updatedAt" timestamp without time zone not null default now(),
    "sub" character varying
);


alter table "public"."user" enable row level security;

create table "public"."users" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying,
    "email" character varying,
    "emailVerified" character varying,
    "image" character varying
);


create table "public"."verification_tokens" (
    "id" uuid not null default uuid_generate_v4(),
    "token" character varying not null,
    "identifier" character varying not null,
    "expires" character varying not null
);


alter sequence "public"."prompt_id_seq" owned by "public"."prompt"."id";

alter sequence "public"."user_id_seq" owned by "public"."user"."id";

CREATE UNIQUE INDEX "PK_3238ef96f18b355b671619111bc" ON public.sessions USING btree (id);

CREATE UNIQUE INDEX "PK_5a7a02c20412299d198e097a8fe" ON public.accounts USING btree (id);

CREATE UNIQUE INDEX "PK_a3ffb1c0c8416b9fc6f907b7433" ON public.users USING btree (id);

CREATE UNIQUE INDEX "PK_cace4a159ff9f2512dd42373760" ON public."user" USING btree (id);

CREATE UNIQUE INDEX "PK_d8e3aa07a95560a445ad50fb931" ON public.prompt USING btree (id);

CREATE UNIQUE INDEX "PK_f2d4d7a2aa57ef199e61567db22" ON public.verification_tokens USING btree (id);

CREATE UNIQUE INDEX "UQ_3641ff83ff7c23b2760b3df56d4" ON public."user" USING btree (sub);

CREATE UNIQUE INDEX "UQ_39c687749d4bd97d75718b4d3e7" ON public.prompt USING btree (prompt);

CREATE UNIQUE INDEX "UQ_8b5e2ec52e335c0fe16d7ec3584" ON public.sessions USING btree ("sessionToken");

CREATE UNIQUE INDEX "UQ_97672ac88f789774dd47f7c8be3" ON public.users USING btree (email);

CREATE UNIQUE INDEX "UQ_a02ac3005932ec5685878ab5ed4" ON public.prompt USING btree (tag);

CREATE UNIQUE INDEX "UQ_f7fa571c91bee07937b8af45859" ON public.prompt USING btree (title);

alter table "public"."accounts" add constraint "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY using index "PK_5a7a02c20412299d198e097a8fe";

alter table "public"."prompt" add constraint "PK_d8e3aa07a95560a445ad50fb931" PRIMARY KEY using index "PK_d8e3aa07a95560a445ad50fb931";

alter table "public"."sessions" add constraint "PK_3238ef96f18b355b671619111bc" PRIMARY KEY using index "PK_3238ef96f18b355b671619111bc";

alter table "public"."user" add constraint "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY using index "PK_cace4a159ff9f2512dd42373760";

alter table "public"."users" add constraint "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY using index "PK_a3ffb1c0c8416b9fc6f907b7433";

alter table "public"."verification_tokens" add constraint "PK_f2d4d7a2aa57ef199e61567db22" PRIMARY KEY using index "PK_f2d4d7a2aa57ef199e61567db22";

alter table "public"."accounts" add constraint "FK_3aa23c0a6d107393e8b40e3e2a6" FOREIGN KEY ("userId") REFERENCES users(id) not valid;

alter table "public"."accounts" validate constraint "FK_3aa23c0a6d107393e8b40e3e2a6";

alter table "public"."prompt" add constraint "FK_980e4f87f8b55f3a5b0a1fa8912" FOREIGN KEY ("creatorId") REFERENCES "user"(id) not valid;

alter table "public"."prompt" validate constraint "FK_980e4f87f8b55f3a5b0a1fa8912";

alter table "public"."prompt" add constraint "UQ_39c687749d4bd97d75718b4d3e7" UNIQUE using index "UQ_39c687749d4bd97d75718b4d3e7";

alter table "public"."prompt" add constraint "UQ_a02ac3005932ec5685878ab5ed4" UNIQUE using index "UQ_a02ac3005932ec5685878ab5ed4";

alter table "public"."prompt" add constraint "UQ_f7fa571c91bee07937b8af45859" UNIQUE using index "UQ_f7fa571c91bee07937b8af45859";

alter table "public"."sessions" add constraint "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES users(id) not valid;

alter table "public"."sessions" validate constraint "FK_57de40bc620f456c7311aa3a1e6";

alter table "public"."sessions" add constraint "UQ_8b5e2ec52e335c0fe16d7ec3584" UNIQUE using index "UQ_8b5e2ec52e335c0fe16d7ec3584";

alter table "public"."user" add constraint "UQ_3641ff83ff7c23b2760b3df56d4" UNIQUE using index "UQ_3641ff83ff7c23b2760b3df56d4";

alter table "public"."users" add constraint "UQ_97672ac88f789774dd47f7c8be3" UNIQUE using index "UQ_97672ac88f789774dd47f7c8be3";

grant delete on table "public"."accounts" to "anon";

grant insert on table "public"."accounts" to "anon";

grant references on table "public"."accounts" to "anon";

grant select on table "public"."accounts" to "anon";

grant trigger on table "public"."accounts" to "anon";

grant truncate on table "public"."accounts" to "anon";

grant update on table "public"."accounts" to "anon";

grant delete on table "public"."accounts" to "authenticated";

grant insert on table "public"."accounts" to "authenticated";

grant references on table "public"."accounts" to "authenticated";

grant select on table "public"."accounts" to "authenticated";

grant trigger on table "public"."accounts" to "authenticated";

grant truncate on table "public"."accounts" to "authenticated";

grant update on table "public"."accounts" to "authenticated";

grant delete on table "public"."accounts" to "service_role";

grant insert on table "public"."accounts" to "service_role";

grant references on table "public"."accounts" to "service_role";

grant select on table "public"."accounts" to "service_role";

grant trigger on table "public"."accounts" to "service_role";

grant truncate on table "public"."accounts" to "service_role";

grant update on table "public"."accounts" to "service_role";

grant delete on table "public"."prompt" to "anon";

grant insert on table "public"."prompt" to "anon";

grant references on table "public"."prompt" to "anon";

grant select on table "public"."prompt" to "anon";

grant trigger on table "public"."prompt" to "anon";

grant truncate on table "public"."prompt" to "anon";

grant update on table "public"."prompt" to "anon";

grant delete on table "public"."prompt" to "authenticated";

grant insert on table "public"."prompt" to "authenticated";

grant references on table "public"."prompt" to "authenticated";

grant select on table "public"."prompt" to "authenticated";

grant trigger on table "public"."prompt" to "authenticated";

grant truncate on table "public"."prompt" to "authenticated";

grant update on table "public"."prompt" to "authenticated";

grant delete on table "public"."prompt" to "service_role";

grant insert on table "public"."prompt" to "service_role";

grant references on table "public"."prompt" to "service_role";

grant select on table "public"."prompt" to "service_role";

grant trigger on table "public"."prompt" to "service_role";

grant truncate on table "public"."prompt" to "service_role";

grant update on table "public"."prompt" to "service_role";

grant delete on table "public"."sessions" to "anon";

grant insert on table "public"."sessions" to "anon";

grant references on table "public"."sessions" to "anon";

grant select on table "public"."sessions" to "anon";

grant trigger on table "public"."sessions" to "anon";

grant truncate on table "public"."sessions" to "anon";

grant update on table "public"."sessions" to "anon";

grant delete on table "public"."sessions" to "authenticated";

grant insert on table "public"."sessions" to "authenticated";

grant references on table "public"."sessions" to "authenticated";

grant select on table "public"."sessions" to "authenticated";

grant trigger on table "public"."sessions" to "authenticated";

grant truncate on table "public"."sessions" to "authenticated";

grant update on table "public"."sessions" to "authenticated";

grant delete on table "public"."sessions" to "service_role";

grant insert on table "public"."sessions" to "service_role";

grant references on table "public"."sessions" to "service_role";

grant select on table "public"."sessions" to "service_role";

grant trigger on table "public"."sessions" to "service_role";

grant truncate on table "public"."sessions" to "service_role";

grant update on table "public"."sessions" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

grant delete on table "public"."verification_tokens" to "anon";

grant insert on table "public"."verification_tokens" to "anon";

grant references on table "public"."verification_tokens" to "anon";

grant select on table "public"."verification_tokens" to "anon";

grant trigger on table "public"."verification_tokens" to "anon";

grant truncate on table "public"."verification_tokens" to "anon";

grant update on table "public"."verification_tokens" to "anon";

grant delete on table "public"."verification_tokens" to "authenticated";

grant insert on table "public"."verification_tokens" to "authenticated";

grant references on table "public"."verification_tokens" to "authenticated";

grant select on table "public"."verification_tokens" to "authenticated";

grant trigger on table "public"."verification_tokens" to "authenticated";

grant truncate on table "public"."verification_tokens" to "authenticated";

grant update on table "public"."verification_tokens" to "authenticated";

grant delete on table "public"."verification_tokens" to "service_role";

grant insert on table "public"."verification_tokens" to "service_role";

grant references on table "public"."verification_tokens" to "service_role";

grant select on table "public"."verification_tokens" to "service_role";

grant trigger on table "public"."verification_tokens" to "service_role";

grant truncate on table "public"."verification_tokens" to "service_role";

grant update on table "public"."verification_tokens" to "service_role";

