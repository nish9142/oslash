import { MigrationInterface, QueryRunner } from "typeorm"

export class Search1670675871719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create index search_idx on short_cut USING GIN(search);
CREATE FUNCTION search_tsvector_trigger() RETURNS trigger AS $$
begin
  new.search :=
  setweight(to_tsvector('english', coalesce(new.shortlink, '')), 'A')
  || setweight(to_tsvector('english', coalesce(new.description, '')), 'B')
  || setweight(to_tsvector('english', coalesce(new.tags, '')), 'C');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON short_cut FOR EACH ROW EXECUTE PROCEDURE search_tsvector_trigger();`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX search_idx
        DROP TRIGGER tsvectorupdate  IF EXISTS
ON short_cut;
        `)
    }

}
