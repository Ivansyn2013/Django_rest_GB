FROM python:3.10
RUN apt-get update \
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev
RUN pip3 install --upgrade pip
COPY ./Django_rest_GB/ ./
COPY ./first_r_app/ ./
RUN pip3 install -r requirements.txt
COPY ./Deploy/wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh