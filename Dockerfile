FROM python:3.10
RUN apt-get update \
&& apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev
RUN pip3 install --upgrade pip
COPY ./Django_rest_GB/ ./Django_rest_GB/Django_rest_GB
COPY ./first_r_app/ ./Django_rest_GB/first_r_app
COPY ./requirements.txt ./Django_rest_GB/
COPY ./manage.py ./Django_rest_GB/
RUN pip3 install -r ./Django_rest_GB/requirements.txt
RUN pip3 install gunicorn
COPY ./Deploy/wait-for-postgres.sh .
RUN chmod +x wait-for-postgres.sh