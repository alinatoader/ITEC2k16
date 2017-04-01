namespace ITEC2016.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accounts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(),
                        Password = c.String(),
                        FirstName = c.String(),
                        LastName = c.String(),
                        LoggedIn = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Description = c.String(),
                        StartTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EventId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        Content = c.String(),
                        Time = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Accounts", t => t.UserId)
                .ForeignKey("dbo.Events", t => t.EventId)
                .Index(t => t.EventId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Interests",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.Int(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Accounts_Events",
                c => new
                    {
                        EventId = c.Int(nullable: false),
                        AccountId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.EventId, t.AccountId })
                .ForeignKey("dbo.Events", t => t.EventId, cascadeDelete: true)
                .ForeignKey("dbo.Accounts", t => t.AccountId, cascadeDelete: true)
                .Index(t => t.EventId)
                .Index(t => t.AccountId);
            
            CreateTable(
                "dbo.Events_Interests",
                c => new
                    {
                        EventId = c.Int(nullable: false),
                        InterestId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.EventId, t.InterestId })
                .ForeignKey("dbo.Events", t => t.EventId, cascadeDelete: true)
                .ForeignKey("dbo.Interests", t => t.InterestId, cascadeDelete: true)
                .Index(t => t.EventId)
                .Index(t => t.InterestId);
            
            CreateTable(
                "dbo.Accounts_Interests",
                c => new
                    {
                        AccountId = c.Int(nullable: false),
                        InterestId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.AccountId, t.InterestId })
                .ForeignKey("dbo.Accounts", t => t.AccountId, cascadeDelete: true)
                .ForeignKey("dbo.Interests", t => t.InterestId, cascadeDelete: true)
                .Index(t => t.AccountId)
                .Index(t => t.InterestId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accounts_Interests", "InterestId", "dbo.Interests");
            DropForeignKey("dbo.Accounts_Interests", "AccountId", "dbo.Accounts");
            DropForeignKey("dbo.Events_Interests", "InterestId", "dbo.Interests");
            DropForeignKey("dbo.Events_Interests", "EventId", "dbo.Events");
            DropForeignKey("dbo.Comments", "EventId", "dbo.Events");
            DropForeignKey("dbo.Comments", "UserId", "dbo.Accounts");
            DropForeignKey("dbo.Accounts_Events", "AccountId", "dbo.Accounts");
            DropForeignKey("dbo.Accounts_Events", "EventId", "dbo.Events");
            DropIndex("dbo.Accounts_Interests", new[] { "InterestId" });
            DropIndex("dbo.Accounts_Interests", new[] { "AccountId" });
            DropIndex("dbo.Events_Interests", new[] { "InterestId" });
            DropIndex("dbo.Events_Interests", new[] { "EventId" });
            DropIndex("dbo.Accounts_Events", new[] { "AccountId" });
            DropIndex("dbo.Accounts_Events", new[] { "EventId" });
            DropIndex("dbo.Comments", new[] { "UserId" });
            DropIndex("dbo.Comments", new[] { "EventId" });
            DropTable("dbo.Accounts_Interests");
            DropTable("dbo.Events_Interests");
            DropTable("dbo.Accounts_Events");
            DropTable("dbo.Interests");
            DropTable("dbo.Comments");
            DropTable("dbo.Events");
            DropTable("dbo.Accounts");
        }
    }
}
