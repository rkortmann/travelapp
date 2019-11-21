# travelapp

How to run
- `git clone git@github.com:rkortmann/travelapp`
- `cd travelapp`
- `docker-compose run web yarn install`
- `docker-compose run web rails db:create`
- `docker-compose run web rails db:migrate`
- `docker-compose up`
- `docker-compose exec web ./bin/webpack-dev-server` (in a separate session to hot reload JS)
