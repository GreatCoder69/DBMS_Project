--------------------------------------------------------
--  Ref Constraints for Table MATCH
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."MATCH" ADD FOREIGN KEY ("TEAM_HOME_ID")
	  REFERENCES "SYSTEM"."TEAM" ("TEAM_ID") ENABLE;
  ALTER TABLE "SYSTEM"."MATCH" ADD FOREIGN KEY ("TEAM_AWAY_ID")
	  REFERENCES "SYSTEM"."TEAM" ("TEAM_ID") ENABLE;
