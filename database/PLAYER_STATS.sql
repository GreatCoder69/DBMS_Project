--------------------------------------------------------
--  DDL for Table PLAYER_STATS
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."PLAYER_STATS" 
   (	"MATCH_ID" NUMBER, 
	"PLAYER_ID" NUMBER, 
	"LINEUP_IS_STARTER" NUMBER(1,0), 
	"LINEUP_POSITION_PLAYED" VARCHAR2(50), 
	"STAT_MINUTES_PLAYED" NUMBER DEFAULT 0, 
	"STAT_GOALS" NUMBER DEFAULT 0, 
	"STAT_ASSISTS" NUMBER DEFAULT 0
   ) ;
