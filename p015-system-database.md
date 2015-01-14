---
layout: page
title: 【015】系统设计：数据库
tagline: Project No.015
project: 015
---
{% include JB/setup %}
##规范

###命名

命名采用驼峰体。

* 表名：tblAppUserInfo
* 字段：userLevel

###其他

数据库：MSSQL

字符集：utf-8

##表定义

###tblQYYAct

互动活动

    /**********************************************************************
    *****    类型:数据表
    *****    名称:tblQYYAct
    *****    标题:互动活动
    *****    备注:-
    *****    日期:2015-1-7 15:51:12
    *****    版权:All4One 1.0.0
    **********************************************************************/
    --DROP TABLE tblQYYAct
    CREATE TABLE tblQYYAct(
      [ID] [decimal](18, 0) IDENTITY(1,1) NOT NULL,
      [actType] [int] NOT NULL CONSTRAINT [DF_tblQYYAct_actType]  DEFAULT (0),
      [actTitle] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYAct_actTitle]  DEFAULT ('-'),
      [actURL] [varchar](3000) NOT NULL CONSTRAINT [DF_tblQYYAct_actURL]  DEFAULT ('-'),
      [memo] [varchar](3000) NOT NULL CONSTRAINT [DF_tblQYYAct_memo]  DEFAULT ('-'),
      [status] [int] NOT NULL CONSTRAINT [DF_tblQYYAct_status]  DEFAULT (0),
      [updateDate] [datetime] NOT NULL CONSTRAINT [DF_tblQYYAct_updateDate]  DEFAULT (getdate()),
      CONSTRAINT [PK_tblQYYAct] PRIMARY KEY CLUSTERED
      (
        [ID] ASC
        )
        ) ON [PRIMARY]

###tblQYYActOption

互动活动参数表

    /**********************************************************************
    *****    类型:数据表
    *****    名称:tblQYYActOption
    *****    标题:活动参数表
    *****    备注:-
    *****    日期:2015-1-7 16:17:43
    *****    版权:All4One 1.0.0
    **********************************************************************/
    --DROP TABLE tblQYYActOption
    CREATE TABLE tblQYYActOption(
      [ID] [decimal](18, 0) IDENTITY(1,1) NOT NULL,
      [ListID] [int] NOT NULL CONSTRAINT [DF_tblQYYActOption_ListID]  DEFAULT (0),
      [optionIndex] [int] NOT NULL CONSTRAINT [DF_tblQYYActOption_optionIndex]  DEFAULT (0),
      [optionName] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActOption_optionName]  DEFAULT ('-'),
      [optionIntro] [varchar](3000) NOT NULL CONSTRAINT [DF_tblQYYActOption_optionIntro]  DEFAULT ('-'),
      [optionConfig] [varchar](3000) NOT NULL CONSTRAINT [DF_tblQYYActOption_optionConfig]  DEFAULT ('-'),
      [data1] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActOption_data1]  DEFAULT (0),
      [data2] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActOption_data2]  DEFAULT (0),
      [data3] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActOption_data3]  DEFAULT (0),
      [status] [int] NOT NULL CONSTRAINT [DF_tblQYYActOption_status]  DEFAULT (0),
      CONSTRAINT [PK_tblQYYActOption] PRIMARY KEY CLUSTERED
      (
        [ID] ASC
        )
        ) ON [PRIMARY]


###tblQYYActUser

互动用户表


    /**********************************************************************
    *****    类型:数据表
    *****    名称:tblQYYActUser
    *****    标题:互动用户表
    *****    备注:
    *****    日期:2015-1-7 17:34:01
    *****    版权:All4One 1.0.0
    **********************************************************************/
    --DROP TABLE tblQYYActUser
    CREATE TABLE tblQYYActUser(
      [ID] [decimal](18, 0) IDENTITY(1,1) NOT NULL,
      [actID] [int] NOT NULL CONSTRAINT [DF_tblQYYActUser_actID]  DEFAULT (0),
      [userName] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActUser_userName]  DEFAULT ('-'),
      [userPhone] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActUser_userPhone]  DEFAULT ('-'),
      [IP] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActUser_IP]  DEFAULT ('-'),
      [data1] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActUser_data1]  DEFAULT (0),
      [data2] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActUser_data2]  DEFAULT (0),
      [data3] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActUser_data3]  DEFAULT (0),
      [updateTime] [datetime] NOT NULL CONSTRAINT [DF_tblQYYActUser_updateTime]  DEFAULT (getdate()),
      [sessionID] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActUser_sessionID]  DEFAULT ('-'),
      CONSTRAINT [PK_tblQYYActUser] PRIMARY KEY CLUSTERED
      (
        [ID] ASC
        )
        ) ON [PRIMARY]
        
###tblQYYActLog

互动记录表

    /**********************************************************************
    *****    类型:数据表
    *****    名称:tblQYYActLog
    *****    标题:互动记录表
    *****    备注:-
    *****    日期:2015-1-7 17:06:38
    *****    版权:All4One 1.0.0
    **********************************************************************/
    --DROP TABLE tblQYYActLog
    CREATE TABLE tblQYYActLog(
      [ID] [decimal](18, 0) IDENTITY(1,1) NOT NULL,
      [actID] [int] NOT NULL CONSTRAINT [DF_tblQYYActLog_actID]  DEFAULT (0),
      [userID] [int] NOT NULL CONSTRAINT [DF_tblQYYActLog_userID]  DEFAULT (0),
      [userName] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLog_userName]  DEFAULT ('-'),
      [userPhone] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLog_userPhone]  DEFAULT ('-'),
      [logType] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLog_logType]  DEFAULT ('-'),
      [logAction] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLog_logAction]  DEFAULT ('-'),
      [logStatus] [int] NOT NULL CONSTRAINT [DF_tblQYYActLog_logStatus]  DEFAULT (0),
      [logData1] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActLog_logData1]  DEFAULT (0),
      [logData2] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActLog_logData2]  DEFAULT (0),
      [memo] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLog_memo]  DEFAULT ('-'),
      [updateTime] [datetime] NOT NULL CONSTRAINT [DF_tblQYYActLog_updateTime]  DEFAULT (getdate()),
      CONSTRAINT [PK_tblQYYActLog] PRIMARY KEY CLUSTERED
      (
        [ID] ASC
        )
        ) ON [PRIMARY]


    /**********************************************************************
    *****    类型:数据表
    *****    名称:tblQYYActLogHistory
    *****    标题:互动记录表审计表
    *****    备注:-
    *****    日期:2015-1-7 17:06:38
    *****    版权:All4One 1.0.0
    **********************************************************************/
    --DROP TABLE tblQYYActLogHistory
    CREATE TABLE tblQYYActLogHistory(
      [ID] [decimal](18, 0) NOT NULL,
      [actID] [int] NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_actID]  DEFAULT (0),
      [userID] [int] NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_userID]  DEFAULT (0),
      [userName] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_userName]  DEFAULT ('-'),
      [userPhone] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_userPhone]  DEFAULT ('-'),
      [logType] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_logType]  DEFAULT ('-'),
      [logAction] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_logAction]  DEFAULT ('-'),
      [logStatus] [int] NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_logStatus]  DEFAULT (0),
      [logData1] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_logData1]  DEFAULT (0),
      [logData2] [decimal](18, 0) NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_logData2]  DEFAULT (0),
      [memo] [varchar](200) NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_memo]  DEFAULT ('-'),
      [updateTime] [datetime] NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_updateTime]  DEFAULT (getdate()),
      [HistoryUpdateTime] [datetime] NOT NULL CONSTRAINT [DF_tblQYYActLogHistory_HistoryUpdateTime]  DEFAULT (getdate())
      ) ON [PRIMARY]


    /**********************************************************************
    *****    类型:触发器
    *****    名称:trQYYActLog_History
    *****    标题:互动记录表审计触发器
    *****    日期:2015-1-7 17:06:38
    *****    版权:All4One 1.0.0
    **********************************************************************/
    --DROP TRIGGER trQYYActLog_History
    CREATE TRIGGER trQYYActLog_History
    ON tblQYYActLog
    AFTER INSERT,UPDATE
    AS
    BEGIN
    INSERT INTO tblQYYActLogHistory SELECT *,getdate() as HistoryUpdateTime FROM INSERTED
    END
