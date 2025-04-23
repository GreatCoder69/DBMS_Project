--------------------------------------------------------
--  Ref Constraints for Table PLAYER
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."PLAYER" ADD FOREIGN KEY ("TEAM_ID")
	  REFERENCES "SYSTEM"."TEAM" ("TEAM_ID") ENABLE;
