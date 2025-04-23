--------------------------------------------------------
--  Ref Constraints for Table EVENT
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."EVENT" ADD FOREIGN KEY ("PLAYER_ID")
	  REFERENCES "SYSTEM"."PLAYER" ("PLAYER_ID") ENABLE;
  ALTER TABLE "SYSTEM"."EVENT" ADD FOREIGN KEY ("MATCH_ID")
	  REFERENCES "SYSTEM"."MATCH" ("MATCH_ID") ENABLE;
