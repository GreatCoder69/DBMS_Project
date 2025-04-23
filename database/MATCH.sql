--------------------------------------------------------
--  DDL for Table MATCH
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."MATCH" 
   (	"MATCH_ID" NUMBER, 
	"TEAM_HOME_ID" NUMBER, 
	"TEAM_AWAY_ID" NUMBER, 
	"MATCH_DATE" DATE, 
	"MATCH_HOME_SCORE" NUMBER DEFAULT 0, 
	"MATCH_AWAY_SCORE" NUMBER DEFAULT 0, 
	"MATCH_HOME_POSSESSION" NUMBER, 
	"MATCH_AWAY_POSSESSION" NUMBER
   ) ;
