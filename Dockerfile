FROM node:23-alpine3.20 AS base

SHELL [ "/bin/bash", "-eu", "-c" ]

FROM base as build

WORKDIR /build

COPY ./package*.json ./

RUN npm install



FROM base AS deploy

ARG USER=user
ARG UID=1001
ARG GID=1001

RUN \
  addgroup --gid "${GID}" "${USER}" \
  && adduser --disabled-password --gecos "" \
  --home "${HOME}" --ingroup "${USER}" --uid "${UID}" "${USER}"


WORKDIR /app

COPY . ./

COPY --from=build /build ./

USER ${USER}

EXPOSE 4000

CMD ["npm", "run", "start"]