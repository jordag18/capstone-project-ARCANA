FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    npm \
    curl \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*



ARG user=analyst

RUN useradd -m -d /home/${user} ${user}

USER $user

WORKDIR /home/$user

RUN mkdir /home/$user/arcana-project/
COPY --chown=analyst:analyst . /home/$user/arcana-project

WORKDIR /home/$user/arcana-project

COPY . .
