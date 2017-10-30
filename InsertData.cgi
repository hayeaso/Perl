#!C:\xampp\perl\bin\perl.exe
print "Content-type: text/html\n\n";

use DBI;
use strict;
use CGI::Carp;    
use CGI;

my $driver   = "SQLite";
my $database = "myAppointments.db";
my $dsn      = "DBI:$driver:dbname=$database";
my $userid   = "";
my $password = "";
my $dbh      = DBI->connect( $dsn, $userid, $password, { RaiseError => 1 } )
  or die $DBI::errstr;

my $cgi = CGI->new();   

my $date = $cgi->param('date');
my $time = $cgi->param('time');
my $desc = $cgi->param('desc');

my @time = split( ':', $time );

my @date = split( '/', $date );

my $dt =
    $date[2] . "-"
  . $date[0] . "-"
  . $date[1] . " "
  . $time[0] . ":"
  . $time[1] . ":00";


$desc = "" . $desc;

my $stmt = "INSERT INTO APPOINTMENTS(DESCRIPTION,APPOINTMENT)
           VALUES ('" . $desc . "','" . $dt . "' );";



my $sth = $dbh->prepare($stmt);

my $rv = $dbh->do($stmt) or die $DBI::errstr;

$dbh->disconnect();
print"<META HTTP-EQUIV=refresh CONTENT=\"1;URL=http://localhost/perl/MyIndex.html\">\n";
