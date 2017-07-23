

CREATE TABLE [dbo].[sys_menu](
	[ID] [bigint] IDENTITY(1,1) primary key NOT NULL,
	[Status] [int] NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[CreateBy] [bigint] NOT NULL,
	[UpdateOn] [datetime] NOT NULL,
	[UpdateBy] [bigint] NOT NULL,
	[Name] [varchar](100) NULL,
	[Code] [varchar](100) NULL,
	[Url] [varchar](100) NULL,
	[IsVisible] [bit] NOT NULL,
	[ParentId] [bigint] NULL,
	[IconResource] [nvarchar](100) NULL,
	[Remark] [nvarchar](100) NULL,
	[SequenceIndex] [int] NULL)


CREATE TABLE [dbo].[sys_dicconfig](
	[ID] [bigint] IDENTITY(1,1) primary key NOT NULL,
	[Status] [int] NOT NULL,
	[CreateOn] [datetime] NOT NULL,
	[CreateBy] [bigint] NOT NULL,
	[UpdateOn] [datetime] NOT NULL,
	[UpdateBy] [bigint] NOT NULL,
	[KeyName] [nvarchar](50) NULL,
	[KeyType] [int] NOT NULL,
	[CnKeyValue] [nvarchar](1000) NULL,
	[EnKeyValue] [nvarchar](200) NULL,
	[ParentID] [bigint] NULL,
	[Sort] [int] NOT NULL,
	[Remark] [nvarchar](1000) NULL)

