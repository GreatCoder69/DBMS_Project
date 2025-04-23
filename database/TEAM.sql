--------------------------------------------------------
--  DDL for Table TEAM
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."TEAM" 
   (	"TEAM_ID" NUMBER, 
	"COACH_ID" NUMBER, 
	"STADIUM_ID" NUMBER, 
	"TEAM_NAME" VARCHAR2(100), 
	"TEAM_PREV_PREM_TITLES" NUMBER, 
	"TEAM_FANS" NUMBER, 
	"TEAM_BADGE" VARCHAR2(255), 
	"TEAM_POINTS" NUMBER DEFAULT 0, 
	"TEAM_FOUNDED_YEAR" NUMBER
   ) ;
