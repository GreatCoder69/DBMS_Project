--------------------------------------------------------
--  Ref Constraints for Table TEAM
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."TEAM" ADD FOREIGN KEY ("COACH_ID")
	  REFERENCES "SYSTEM"."COACH" ("COACH_ID") ENABLE;
  ALTER TABLE "SYSTEM"."TEAM" ADD FOREIGN KEY ("STADIUM_ID")
	  REFERENCES "SYSTEM"."STADIUM" ("STADIUM_ID") ENABLE;
