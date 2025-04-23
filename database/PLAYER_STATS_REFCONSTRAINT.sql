--------------------------------------------------------
--  Ref Constraints for Table PLAYER_STATS
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."PLAYER_STATS" ADD FOREIGN KEY ("MATCH_ID")
	  REFERENCES "SYSTEM"."MATCH" ("MATCH_ID") ENABLE;
  ALTER TABLE "SYSTEM"."PLAYER_STATS" ADD FOREIGN KEY ("PLAYER_ID")
	  REFERENCES "SYSTEM"."PLAYER" ("PLAYER_ID") ENABLE;
