--------------------------------------------------------
--  Constraints for Table PLAYER_STATS
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."PLAYER_STATS" ADD PRIMARY KEY ("MATCH_ID", "PLAYER_ID")
  USING INDEX  ENABLE;
